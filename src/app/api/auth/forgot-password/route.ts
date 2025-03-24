import { NextResponse } from "next/server"
import { API_ENDPOINTS } from "@/lib/api"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate input
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Forward the request to the actual API
    const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    // Return the response from the actual API
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ message: "An error occurred while processing your request" }, { status: 500 })
  }
}

