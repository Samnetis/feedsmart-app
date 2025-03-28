// Base API URL
export const BASE_URL = "https://nutrisnap.climdesdata.com"

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/v1/auth/login`,
  REGISTER: `${BASE_URL}/api/v1/users`,
  FORGOT_PASSWORD: `${BASE_URL}/api/v1/auth/forgot-password`,
  RESET_PASSWORD: (token: string) => `${BASE_URL}/api/v1/auth/reset-password/${token}`,
}

// Helper function for API requests
export async function apiRequest(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", data?: any) {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || "An error occurred")
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

// A function to handle registration with proper field mapping
export async function registerUser(userData: any) {
  const apiData = {
    firstName: userData.fullName || userData.firstName, // fullName was mapped to firstName
    name: userData.fullName || userData.name,
    email: userData.email,
    phone: userData.mobileNumber || userData.phone,
    dob: userData.dateOfBirth || userData.dob,
    password: userData.password,
  }

  return apiRequest(API_ENDPOINTS.REGISTER, "POST", apiData)
}

export async function forgotPassword(email: string) {
  return apiRequest(API_ENDPOINTS.FORGOT_PASSWORD, "POST", { email })
}

export async function resetPassword(token: string, password: string) {
  return apiRequest(API_ENDPOINTS.RESET_PASSWORD(token), "POST", { password })
}

