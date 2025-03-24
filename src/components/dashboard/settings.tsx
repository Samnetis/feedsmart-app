"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SettingsProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

export default function Settings({ darkMode, setDarkMode }: SettingsProps) {
  const [user, setUser] = useState<any>(null)
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg?height=80&width=80")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }

    // Get profile image from localStorage if available
    const savedProfileImage = localStorage.getItem("profileImage")
    if (savedProfileImage) {
      setProfileImage(savedProfileImage)
    }
  }, [])

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setProfileImage(imageUrl)
        // Save to localStorage
        localStorage.setItem("profileImage", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleSaveChanges = () => {
    // Save user data
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    }

    // Show success message
    alert("Profile updated successfully!")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev: any) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="text-sm text-gray-500">Manage your account and application preferences.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-2">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                <Button variant="outline" size="sm" onClick={handleBrowseClick}>
                  Change Photo
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input name="name" value={user?.name || ""} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" value={user?.email || ""} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the application appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Theme</label>
                <div className="flex items-center justify-between mt-2">
                  <span>Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-gray-200"}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Language</label>
                <select className="w-full mt-1 rounded-md border border-gray-300 p-2">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Preferences</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

