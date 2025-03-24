import { NextResponse } from "next/server"

const BASE_URL = "https://postman-rest-api-learner.glitch.me"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { currentPassword, newPassword, userId } = body

    // Validate input
    if (!currentPassword || !newPassword || !userId) {
      return NextResponse.json({ message: "Current password, new password, and user ID are required" }, { status: 400 })
    }

    // Connect to the actual update password endpoint
    const response = await fetch(`${BASE_URL}/api/v1/auth/update-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        userId,
      }),
    })

    const data = await response.json()

    // If the API returns an error
    if (!response.ok) {
      return NextResponse.json({ message: data.message || "Password update failed" }, { status: response.status })
    }

    // Return the successful response
    return NextResponse.json(data)
  } catch (error) {
    console.error("Password update error:", error)
    return NextResponse.json({ message: "An error occurred while updating your password" }, { status: 500 })
  }
}

