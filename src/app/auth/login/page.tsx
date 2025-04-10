"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Info, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Use our Next.js API route which will proxy to the real API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

      // Extract user data from the response - handle the nested structure
      let userData
      let token

      console.log("Processing login response data:", data)

      if (data.data && data.data.user) {
        // Handle the nested structure from your API
        userData = data.data.user
        token = data.data.token
      } else if (data.user) {
        userData = data.user
        token = data.token
      } else {
        userData = data
        token = data.token
      }

      console.log("Extracted user data:", userData)
      console.log("Extracted token:", token)

      // Format the user data to match what the dashboard expects
      const formattedUserData = {
        ...userData,
        // Ensure name is set for display purposes
        name:
          userData.firstName && userData.lastName
            ? `${userData.firstName} ${userData.lastName}`
            : userData.firstName || userData.email?.split("@")[0] || "User",
      }

      console.log("Formatted user data for storage:", formattedUserData)

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(formattedUserData))

      // Store token if available
      if (token) {
        localStorage.setItem("token", token)
      }

      // Check if user has set up a security PIN
      const hasPin = localStorage.getItem("securityPin")

      // Redirect to appropriate page
      router.push(hasPin ? "/dashboard" : "/auth/security-pin")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Welcome</h1>
          </div>

          <div className="bg-[#0D3B36] rounded-3xl p-6 text-white">
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {error && <p className="text-red-300 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-white text-[#0D3B36] hover:bg-gray-100" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>

              <div className="text-center">
                <Link href="/auth/forgot-password" className="text-sm text-white hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <div className="text-center pt-2">
                <Button
                  variant="ghost"
                  className="w-full border border-white text-white hover:bg-white/10"
                  onClick={() => router.push("/auth/register")}
                >
                  Sign Up
                </Button>
              </div>

              <div className="text-center text-xs mt-4">
                <p>Using FeedSmart, I&apos;m Access</p>
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
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="underline">
                Sign up
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

