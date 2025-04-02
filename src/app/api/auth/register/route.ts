import { type NextRequest, NextResponse } from "next/server"

// The actual backend API URL
const API_URL = "https://nutrisnap.climdesdata.com/api/v1/users"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Received registration data:", data)

    // Make sure we're using the correct field names
    if (data.lasttName && !data.lastName) {
      data.lastName = data.lasttName
      delete data.lasttName
    }

    // Add passwordConfirm field if it doesn't exist
    if (data.confirmPassword && !data.passwordConfirm) {
      data.passwordConfirm = data.confirmPassword
    } else if (data.password && !data.passwordConfirm) {
      // If confirmPassword is not provided, use password as passwordConfirm
      data.passwordConfirm = data.password
    }

    // Validate required fields
    if (!data.firstName || !data.lastName) {
      return NextResponse.json({ message: "FirstName and LastName is required" }, { status: 400 })
    }

    // Create a new object with only the fields expected by the API
    const apiData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    }

    console.log("Sending to API:", apiData)

    // Forward the request to the actual API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
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
      // If it's not valid JSON, return the text as it is
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
    console.error("Registration error:", error)
    return NextResponse.json({ message: error.message || "Registration failed" }, { status: 500 })
  }
}

