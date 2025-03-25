"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Make sure we have a valid user object
      const userData = data.user || data

      // Ensure the user object has a name property
      if (!userData.name && userData.email) {
        userData.name = userData.email.split("@")[0] // Use email username as fallback
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      // Store token if available
      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      // Successful login
      router.push("/dashboard")
    } catch (err: any) {
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
              Don't have an account?{" "}
              <Link href="/auth/register" className="underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="p-4 flex justify-center">
        <Image src="/feedsmart-logo.png" alt="FeedSmart Logo" width={120} height={40} />
      </footer>
    </div>
  )
}

