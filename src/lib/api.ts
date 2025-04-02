// Fix the base URL by removing the double slash
export const BASE_URL = "https://nutrisnap.climdesdata.com/api/v1"

// API endpoints exactly as provided
export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`, // POST Login
  REGISTER: `${BASE_URL}/users`, // POST Create User
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`, // POST Forgot Password
  RESET_PASSWORD: (token: string) => `${BASE_URL}/auth/reset-password/${token}`, // POST Reset Password
  UPDATE_PASSWORD: `${BASE_URL}/auth/update-password`, // PATCH Update Password
  GET_LOGGED_IN_USER: `${BASE_URL}/users/me`, // GET Get Logged In User
  GET_ALL_USERS: `${BASE_URL}/users`, // GET Get All Users
  UPDATE_USER: `${BASE_URL}/users`, // PUT Update User
}

// Helper function for API requests with improved error handling
export async function apiRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
) {
  try {
    console.log(`Making ${method} request to: ${endpoint}`)

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if token exists
        ...(localStorage.getItem("token")
          ? {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          : {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    // Log response status for debugging
    console.log(`Response status: ${response.status}`)

    // Check if the response is JSON by trying to parse it
    let responseData
    const responseText = await response.text()

    try {
      // Try to parse as JSON
      responseData = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Error parsing response as JSON:", responseText)

      // If it's HTML, extract any error message
      if (responseText.includes("<!DOCTYPE html>")) {
        const errorMatch = responseText.match(/<pre>(.*?)<\/pre>/)
        const errorMessage = errorMatch ? errorMatch[1] : "Server returned HTML instead of JSON"
        throw new Error(errorMessage)
      }

      // If it's not HTML either, just return the text
      responseData = { message: responseText }
    }

    if (!response.ok) {
      throw new Error(responseData.message || `Request failed with status ${response.status}`)
    }

    return responseData
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

// Authentication functions
export async function login(email: string, password: string) {
  return apiRequest(API_ENDPOINTS.LOGIN, "POST", { email, password })
}

export async function register(userData: any) {
  return apiRequest(API_ENDPOINTS.REGISTER, "POST", userData)
}

export async function forgotPassword(email: string) {
  return apiRequest(API_ENDPOINTS.FORGOT_PASSWORD, "POST", { email })
}

export async function resetPassword(token: string, password: string) {
  return apiRequest(API_ENDPOINTS.RESET_PASSWORD(token), "POST", { password })
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  return apiRequest(API_ENDPOINTS.UPDATE_PASSWORD, "PATCH", {
    currentPassword,
    newPassword,
  })
}

export async function getLoggedInUser() {
  return apiRequest(API_ENDPOINTS.GET_LOGGED_IN_USER, "GET")
}

export async function getAllUsers() {
  return apiRequest(API_ENDPOINTS.GET_ALL_USERS, "GET")
}

export async function updateUser(userData: any) {
  return apiRequest(API_ENDPOINTS.UPDATE_USER, "PUT", userData)
}

