import { type NextRequest, NextResponse } from "next/server"

// The actual backend API URL
const API_URL = "https://nutrisnap.climdesdata.com/api/v1/auth/login"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Received login data:", data)

    // Forward the request to the actual API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    // Get the response as text first
    const responseText = await response.text()

    console.log("API response status:", response.status)
    console.log("API response text:", responseText)

    // Try to parse as JSON
    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch (e) {
      // If it's not valid JSON, return the text as is
      if (!response.ok) {
        return NextResponse.json(
          { message: responseText || `Request failed with status ${response.status}` },
          { status: response.status },
        )
      }
      responseData = { message: responseText }
    }

    // If the response was not successful, return the error
    if (!response.ok) {
      return NextResponse.json(
        { message: responseData.message || `Request failed with status ${response.status}` },
        { status: response.status },
      )
    }

    // Return the successful response
    return NextResponse.json(responseData)
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ message: error.message || "Login failed" }, { status: 500 })
  }
}

