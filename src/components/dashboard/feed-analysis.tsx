"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, Upload, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FeedAnalysisResults from "./feed-analysis-results"

interface FeedAnalysisProps {
  darkMode: boolean
}

export default function FeedAnalysis({ darkMode }: FeedAnalysisProps) {
  const [selectedFeedType, setSelectedFeedType] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisMode, setAnalysisMode] = useState<"upload" | "analysis" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

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

    // Clean up camera if active
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      setShowCamera(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext("2d")
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageDataUrl = canvas.toDataURL("image/png")
        setUploadedImage(imageDataUrl)

        // Stop camera stream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
          setStream(null)
        }

        setShowCamera(false)
      }
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  if (analysisMode === "analysis" && uploadedImage) {
    return (
      <FeedAnalysisResults
        feedType={selectedFeedType || ""}
        imageUrl={uploadedImage}
        onBack={resetAnalysis}
        darkMode={darkMode}
      />
    )
  } else if (analysisMode === "upload" && selectedFeedType) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setSelectedFeedType(null)}>
            <ChevronRight className="rotate-180 mr-1" size={16} />
            Back
          </Button>
          <h2 className="text-xl font-semibold">
            {selectedFeedType === "homogeneous" ? "Homogeneous Feed Analysis" : "Heterogeneous Feed Analysis"}
          </h2>
        </div>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Upload Feed Image</CardTitle>
            <CardDescription>
              Upload a clear image of your {selectedFeedType === "homogeneous" ? "single component" : "mixed"} feed
              sample
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showCamera ? (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-md overflow-hidden bg-black">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={stopCamera}>
                    Cancel
                  </Button>
                  <Button onClick={capturePhoto}>Take Photo</Button>
                </div>
              </div>
            ) : uploadedImage ? (
              <div className="space-y-4">
                <div className="aspect-video relative rounded-md overflow-hidden">
                  <Image src={uploadedImage || "/placeholder.svg"} alt="Uploaded Feed" fill className="object-cover" />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setUploadedImage(null)}>
                    Upload Different Image
                  </Button>
                  <Button onClick={handleGetInsights}>Get Insights</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Upload className="text-gray-500" size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Drag and drop your image here</p>
                    <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Button variant="outline" size="sm" onClick={handleBrowseClick}>
                    Browse Files
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-gray-500">Supported formats: JPG, PNG, WEBP. Max size: 10MB</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={startCamera}>
                <Camera className="mr-1" size={16} />
                Take Photo
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ensure good lighting when taking photos of your feed sample</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Place the feed on a neutral background for better contrast</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>For heterogeneous feeds, ensure all components are visible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Include a size reference if possible (like a coin)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Feed Analysis</h2>
        <p className="text-sm text-gray-500">
          Select the type of feed you want to analyze to get detailed nutritional insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleFeedTypeSelect("homogeneous")}
          >
            <CardHeader>
              <CardTitle>Homogeneous Feed</CardTitle>
              <CardDescription>Analyze individual feed components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-[#e8f4f0]"}`}>
                  <Camera className="text-[#4ea58d]" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Ideal for single-ingredient feeds like corn, hay, silage, or grains.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select</Button>
            </CardFooter>
          </Card>

          <Card
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleFeedTypeSelect("heterogeneous")}
          >
            <CardHeader>
              <CardTitle>Heterogeneous Feed</CardTitle>
              <CardDescription>Assess complete feed composition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-[#e8f4f0]"}`}>
                  <Upload className="text-[#4ea58d]" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Perfect for mixed feeds, TMR (Total Mixed Ration), or compound feeds.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select</Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8f4f0] flex items-center justify-center">
                  <span className="font-medium text-[#4ea58d]">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Select Feed Type</h4>
                  <p className="text-sm text-gray-500">Choose between homogeneous or heterogeneous feed analysis</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8f4f0] flex items-center justify-center">
                  <span className="font-medium text-[#4ea58d]">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Upload or Capture Image</h4>
                  <p className="text-sm text-gray-500">Take a photo or upload an existing image of your feed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8f4f0] flex items-center justify-center">
                  <span className="font-medium text-[#4ea58d]">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Get Nutritional Insights</h4>
                  <p className="text-sm text-gray-500">Receive detailed analysis and recommendations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8f4f0] flex items-center justify-center">
                  <span className="font-medium text-[#4ea58d]">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Chat with AI Assistant</h4>
                  <p className="text-sm text-gray-500">
                    Get personalized recommendations and answers to your questions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

