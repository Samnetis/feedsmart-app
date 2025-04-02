"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Info, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      setIsLoading(false)
      return
    }

    try {
      // Prepare the data in the format expected by the API
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        password: formData.password,
        confirmPassword: formData.confirmPassword, // This will be mapped to passwordConfirm in the API route
        passwordConfirm: formData.confirmPassword, // Also include the expected field name directly
      }

      console.log("Sending registration data:", userData)

      // Call our Next.js API route which will proxy to the real API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      // Get the response text first
      const responseText = await response.text()
      console.log("Response status:", response.status)
      console.log("Response text:", responseText)

      // Try to parse as JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        if (!response.ok) {
          throw new Error(responseText || `Request failed with status ${response.status}`)
        }
        data = { message: responseText }
      }

      // If the response was not successful, throw an error
      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`)
      }

      // Store user data in localStorage if available
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      } else if (data.data) {
        localStorage.setItem("user", JSON.stringify(data.data))
      } else {
        localStorage.setItem("user", JSON.stringify(data))
      }

      // Store token if available
      if (data.token) {
        localStorage.setItem("token", data.token)
      } else if (data.accessToken) {
        localStorage.setItem("token", data.accessToken)
      }

      // Show success message
      setSuccessMessage("Registration successful! Redirecting to security PIN setup...")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/auth/security-pin")
      }, 2000)
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Create Account</h1>
          </div>

          <div className="bg-[#0D3B36] rounded-3xl p-6 text-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-white text-black"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-white text-black"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white text-black"
                  placeholder="username@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white text-black"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-white">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="bg-white text-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-white text-black pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-white text-black pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="agreeToTerms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} />
                <label htmlFor="agreeToTerms" className="text-xs leading-tight cursor-pointer">
                  By signing up, I agree to the{" "}
                  <Link href="/terms" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {error && <p className="text-red-300 text-sm">{error}</p>}
              {successMessage && <p className="text-green-300 text-sm">{successMessage}</p>}

              <Button type="submit" className="w-full bg-white text-[#0D3B36] hover:bg-gray-100" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>

              <div className="text-center text-xs mt-4">
                <p>Using FeedSmart, I'm Access</p>
              </div>
            </form>

            <div className="flex justify-center space-x-4 mt-6">
              <button className="rounded-full bg-white/10 p-2">
                <Info size={18} className="text-white" />
              </button>
              <button className="rounded-full bg-white/10 p-2">
                <HelpCircle size={18} className="text-white" />
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="p-4 flex justify-center">
        <div className="h-10 w-32 bg-gray-200 flex items-center justify-center rounded">
          <p className="text-sm text-gray-500">FeedSmart Logo</p>
        </div>
      </footer>
    </div>
  )
}

