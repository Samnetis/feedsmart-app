"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Home, Package, FileText, Users, HelpCircle, Settings, LogOut } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  darkMode: boolean
  resetAnalysisState?: () => void
}

export default function Sidebar({ activeTab, setActiveTab, darkMode, resetAnalysisState }: SidebarProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        // Make sure we have a valid user object with a name
        if (parsedUser && typeof parsedUser === "object") {
          // Use the name from the user data, or fallback to firstName, or email, or "User"
          const displayName = parsedUser.name || parsedUser.firstName || parsedUser.email?.split("@")[0] || "User"
          setUser({
            ...parsedUser,
            name: displayName,
          })
        }
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    // Remove user data and token
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "feed-analysis" && resetAnalysisState) {
      resetAnalysisState()
    }
  }

  // Get profile image from localStorage if available
  const profileImage = localStorage.getItem("profileImage") || "/placeholder.svg?height=80&width=80"

  return (
    <div className={`w-64 flex-shrink-0 ${darkMode ? "bg-gray-800" : "bg-[#2c4657]"} text-white`}>
      {/* User Profile */}
      <div className="p-4 text-center border-b border-gray-700">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2 bg-gray-300">
          <Image
            src={profileImage || "/placeholder.svg"}
            alt="Profile"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="font-medium">{user?.name || "User"}</h3>
        <p className="text-xs text-gray-300 truncate">{user?.email || "user@example.com"}</p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleTabChange("dashboard")}
              className={`flex items-center w-full p-2 rounded-md ${activeTab === "dashboard" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <Home size={18} className="mr-3" />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("feed-analysis")}
              className={`flex items-center w-full p-2 rounded-md ${activeTab === "feed-analysis" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <Package size={18} className="mr-3" />
              <span>Feed Analysis</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("reports")}
              className={`flex items-center w-full p-2 rounded-md ${activeTab === "reports" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <FileText size={18} className="mr-3" />
              <span>Reports</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("users")}
              className={`flex items-center w-full p-2 rounded-md ${activeTab === "users" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <Users size={18} className="mr-3" />
              <span>Users</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("support")}
              className={`flex items-center w-full p-2 rounded-md ${activeTab === "support" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <HelpCircle size={18} className="mr-3" />
              <span>Support</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("settings")}
              className={`flex items-center w-full p-2 rounded-md ${activeTab === "settings" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <Settings size={18} className="mr-3" />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button onClick={handleLogout} className="flex items-center w-full p-2 rounded-md hover:bg-white/5">
          <LogOut size={18} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

