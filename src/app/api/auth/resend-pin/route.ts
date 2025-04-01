import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Simulate a successful response
    return NextResponse.json({
      success: true,
      message: "PIN resent successfully",
    })
  } catch (error) {
    console.error("PIN resend error:", error)
    return NextResponse.json({ message: "An error occurred while resending PIN" }, { status: 500 })
  }
}

