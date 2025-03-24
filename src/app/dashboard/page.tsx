"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Import components
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import DashboardOverview from "@/components/dashboard/dashboard-overview"
import FeedAnalysis from "@/components/dashboard/feed-analysis"
import Reports from "@/components/dashboard/reports"
import UsersComponent from "@/components/dashboard/users"
import Support from "@/components/dashboard/support"
import SettingsComponent from "@/components/dashboard/settings"
import ChatBot from "@/components/dashboard/chat-bot"

import type React from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<{ type: "user" | "bot"; text: string }[]>([
    { type: "bot", text: "Hello! I'm your FeedSmart AI assistant. How can I help you with livestock nutrition today?" },
  ])
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedFeedType, setSelectedFeedType] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisMode, setAnalysisMode] = useState<"upload" | "analysis" | null>(null)

  // Feed analysis data
  const feedData = {
    totalFeeds: 124,
    analyzedFeeds: 89,
    savedAnalyses: 42,
    pendingAnalyses: 12,
  }

  // Recent feed analyses
  const recentAnalyses = [
    { id: 1, name: "Corn Silage", date: "2023-10-15", type: "Homogeneous", status: "Completed" },
    { id: 2, name: "Mixed Grain", date: "2023-10-12", type: "Heterogeneous", status: "Completed" },
    { id: 3, name: "Alfalfa Hay", date: "2023-10-10", type: "Homogeneous", status: "Completed" },
    { id: 4, name: "TMR Mixture", date: "2023-10-08", type: "Heterogeneous", status: "Completed" },
  ]

  // Nutritional insights
  const nutritionalInsights = [
    { nutrient: "Protein", value: "18.5%", recommendation: "Optimal (15-20%)" },
    { nutrient: "Fiber", value: "22.3%", recommendation: "Slightly high (target: 18-22%)" },
    { nutrient: "Starch", value: "32.1%", recommendation: "Optimal (30-35%)" },
    { nutrient: "Fat", value: "4.2%", recommendation: "Optimal (3-5%)" },
    { nutrient: "Minerals", value: "8.7%", recommendation: "Slightly low (target: 9-11%)" },
  ]

  // Reset analysis state function to pass to sidebar
  const resetAnalysisState = () => {
    setActiveTab("feed-analysis")
  }

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const sendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setChatMessages((prev) => [...prev, { type: "user", text: message }])

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Based on your feed analysis, I recommend increasing protein content by 2% for optimal nutrition and reduced methane emissions. Would you like more specific recommendations?",
        },
      ])
    }, 1000)

    setMessage("")
  }

  const handleFeedTypeSelect = (type: string) => {
    setSelectedFeedType(type)
    setAnalysisMode("upload")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGetInsights = () => {
    setAnalysisMode("analysis")
  }

  const resetAnalysis = () => {
    setSelectedFeedType(null)
    setUploadedImage(null)
    setAnalysisMode(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#d9e9ed]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2c4657] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-[#2c4657]">Loading...</h2>
        </div>
      </div>
    )
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview darkMode={darkMode} user={user} setActiveTab={setActiveTab} />
      case "feed-analysis":
        return <FeedAnalysis darkMode={darkMode} />
      case "reports":
        return <Reports />
      case "users":
        return <UsersComponent />
      case "support":
        return <Support />
      case "settings":
        return <SettingsComponent darkMode={darkMode} setDarkMode={setDarkMode} />
      default:
        return <DashboardOverview darkMode={darkMode} user={user} setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#d9e9ed] text-[#2c4657]"}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          resetAnalysisState={resetAnalysisState}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Main Dashboard Content */}
          <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? "bg-gray-900" : "bg-[#f0f7fa]"}`}>
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Chatbot Button - Only show on dashboard */}
      {activeTab === "dashboard" && <ChatBot />}
    </div>
  )
}

