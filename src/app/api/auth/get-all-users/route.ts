import { NextResponse } from "next/server"
import { API_ENDPOINTS } from "@/lib/api"

export async function GET(request: Request) {
  try {
    // Get token from request headers
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    console.log("Get all users request with token:", token)

    // Forward the request to the API endpoint with the correct URL
    const apiUrl = API_ENDPOINTS.GET_ALL_USERS
    console.log("Sending request to:", apiUrl)

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Log the response status for debugging
      console.log("API response status:", response.status)

      // Get the response text first
      const responseText = await response.text()
      console.log("API response text:", responseText)

      let responseData

      // Try to parse as JSON
      try {
        responseData = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Error parsing response as JSON")

        // If it's HTML, extract any error message
        if (responseText.includes("<!DOCTYPE html>")) {
          const errorMatch = responseText.match(/<pre>(.*?)<\/pre>/)
          if (errorMatch) {
            const errorMessage = errorMatch[1]
            console.error("HTML error message:", errorMessage)

            // Return a formatted error response
            return NextResponse.json(
              {
                message: `API Error: ${errorMessage}. Please check the API endpoint.`,
              },
              { status: 400 },
            )
          }
        }

        // If we can't extract a specific error, return the whole response text
        return NextResponse.json(
          {
            message: `API returned non-JSON response: ${responseText}`,
          },
          { status: 500 },
        )
      }

      // Return the parsed JSON response
      return NextResponse.json(responseData, { status: response.status })
    } catch (apiError: any) {
      console.error("Error calling external API:", apiError)
      return NextResponse.json(
        {
          message: `API request failed: ${apiError.message}`,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Get all users error in API route:", error)
    return NextResponse.json(
      {
        message: `An error occurred while getting users data: ${error.message}`,
      },
      { status: 500 },
    )
  }
}

