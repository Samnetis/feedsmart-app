"use client"

import { Input } from "@/components/ui/input"
import { Search, Moon, Bell } from "lucide-react"

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header
      className={`p-4 flex items-center justify-between border-b ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <h1 className="text-xl font-semibold">FeedSmart</h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className={`pl-9 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-200"}`}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
        >
          <Moon size={18} />
        </button>

        <button className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <Bell size={18} />
        </button>
      </div>
    </header>
  )
}

