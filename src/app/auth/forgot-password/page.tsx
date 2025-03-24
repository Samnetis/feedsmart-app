"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Info, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [resetToken, setResetToken] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Password reset request failed")
      }

      // For demo purposes, I'm using a hardcoded token
      // If this app will be deployed, then this token would be sent to the user's email
      setResetToken("559728")

      // Successful request
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Reset Password?</h1>
          </div>

          <div className="bg-[#0D3B36] rounded-3xl p-6 text-white">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm mb-4">
                    Enter your email address associated with your account, and we'll send you a password reset link.
                  </p>
                  <Label htmlFor="email" className="text-white">
                    Enter Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white text-black"
                    placeholder="username@example.com"
                  />
                </div>

                {error && <p className="text-red-300 text-sm">{error}</p>}

                <Button type="submit" className="w-full bg-white text-[#0D3B36] hover:bg-gray-100" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Next Step"}
                </Button>

                <div className="text-center pt-4">
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
            ) : (
              <div className="space-y-6 text-center">
                <div className="py-4">
                  <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
                  <p className="text-sm">
                    We've sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-sm mt-2">
                    For demo purposes, your reset token is: <span className="font-bold">{resetToken}</span>
                  </p>
                </div>

                <Button
                  className="w-full bg-white text-[#0D3B36] hover:bg-gray-100"
                  onClick={() => router.push(`/auth/reset-password?token=${resetToken}`)}
                >
                  Continue to Reset Password
                </Button>

                <p className="text-sm">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => {
                      setSuccess(false)
                      handleSubmit(new Event("submit") as any)
                    }}
                    className="underline"
                  >
                    Resend
                  </button>
                </p>
              </div>
            )}

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
              Remember your password?{" "}
              <Link href="/auth/login" className="underline">
                Log in
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

