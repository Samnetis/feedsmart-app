"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Info, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SecurityPinPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [pin, setPin] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (!/^\d*$/.test(value)) {
      return
    }

    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key down for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (!/^\d+$/.test(pastedData)) {
      return
    }

    const digits = pastedData.slice(0, 6).split("")
    const newPin = [...pin]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newPin[index] = digit
      }
    })

    setPin(newPin)

    // Focus the next empty input or the last one
    const nextEmptyIndex = newPin.findIndex((val) => val === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if PIN is complete
    if (pin.some((digit) => digit === "")) {
      setError("Please enter all 6 digits")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/verify-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin: pin.join("") }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "PIN verification failed")
      }

      // Successful verification
      router.push("/dashboard") // Redirect to dashboard or home page
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during verification")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle resend PIN
  const handleResend = async () => {
    if (resendDisabled) return

    setIsVerifying(true)
    setError("")

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/resend-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend PIN")
      }

      // Start countdown
      setResendDisabled(true)
      setCountdown(60)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false)
    }
  }, [countdown, resendDisabled])

  // Fixed ref callback function that doesn't return a value
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Enter Security PIN</h1>
          </div>

          <div className="bg-[#0D3B36] rounded-3xl p-6 text-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {pin.map((digit, index) => (
                    <div key={index} className="w-10 h-10 relative">
                      <input
                        ref={setInputRef(index)}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-full h-full rounded-full bg-white text-black text-center font-bold text-lg"
                        maxLength={1}
                      />
                    </div>
                  ))}
                </div>

                {error && <p className="text-red-300 text-sm text-center">{error}</p>}
              </div>

              <div className="space-y-2">
                <Button type="submit" className="w-full bg-white text-[#0D3B36] hover:bg-gray-100" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Accept"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full border border-white text-white hover:bg-white/10"
                  onClick={handleResend}
                  disabled={isVerifying || resendDisabled}
                >
                  {resendDisabled ? `Send Again (${countdown}s)` : isVerifying ? "Sending..." : "Send Again"}
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
              Having trouble?{" "}
              <Link href="/support" className="underline">
                Contact Support
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

