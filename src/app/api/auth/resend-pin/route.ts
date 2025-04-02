import { NextResponse } from "next/server"

const BASE_URL = "https://postman-rest-api-learner.glitch.me"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId } = body
    // Simulate a successful response
    return NextResponse.json({
      success: true,
      message: "PIN resent successfully",
      userId,
    })
  } catch (error) {
    console.error("PIN resend error:", error)
    return NextResponse.json({ message: "An error occurred while resending PIN" }, { status: 500 })
  }
}

