import { NextResponse } from "next/server"

const BASE_URL = "https://postman-rest-api-learner.glitch.me"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pin, userId } = body

    // Validate input
    if (!pin || pin.length !== 6) {
      return NextResponse.json({ message: "Valid 6-digit PIN is required" }, { status: 400 })
    }
    // Simulate a successful response
    return NextResponse.json({
      success: true,
      message: "PIN verified successfully",
      userId,
    })
  } catch (error) {
    console.error("PIN verification error:", error)
    return NextResponse.json({ message: "An error occurred during PIN verification" }, { status: 500 })
  }
}

