import { NextResponse } from "next/server"
import { API_ENDPOINTS } from "@/lib/api"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, mobileNumber, dateOfBirth, password } = body

    // Validate input
    if (!fullName || !email || !mobileNumber || !dateOfBirth || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Prepare user data for API
    const userData = {
      firstName: fullName, // Add firstName field
      name: fullName,
      email,
      phone: mobileNumber,
      dob: dateOfBirth,
      password,
    }

    // Forward the request to the actual API
    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    // Return the response from the actual API
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}

