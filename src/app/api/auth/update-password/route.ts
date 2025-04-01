import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { currentPassword, newPassword, userId } = body

    // Validate input
    if (!currentPassword || !newPassword || !userId) {
      return NextResponse.json({ message: "Current password, new password, and user ID are required" }, { status: 400 })
    }

    // Forward the request to the actual API
    const response = await fetch("/api/v1/auth/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword, userId }),
    })

    const data = await response.json()

    // Return the response from the actual API
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Password update error:", error)
    return NextResponse.json({ message: "An error occurred while updating your password" }, { status: 500 })
  }
}

