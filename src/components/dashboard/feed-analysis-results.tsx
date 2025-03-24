"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ChatBot from "./chat-bot"

interface FeedAnalysisResultsProps {
  feedType: string
  imageUrl: string
  onBack: () => void
  darkMode: boolean
}

export default function FeedAnalysisResults({ feedType, imageUrl, onBack, darkMode }: FeedAnalysisResultsProps) {
  const [showChatBot, setShowChatBot] = useState(false)

  // Nutritional insights
  const nutritionalInsights = [
    { nutrient: "Protein", value: "18.5%", recommendation: "Optimal (15-20%)" },
    { nutrient: "Fiber", value: "22.3%", recommendation: "Slightly high (target: 18-22%)" },
    { nutrient: "Starch", value: "32.1%", recommendation: "Optimal (30-35%)" },
    { nutrient: "Fat", value: "4.2%", recommendation: "Optimal (3-5%)" },
    { nutrient: "Minerals", value: "8.7%", recommendation: "Slightly low (target: 9-11%)" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronRight className="rotate-180 mr-1" size={16} />
          Back
        </Button>
        <h2 className="text-xl font-semibold">Feed Analysis Results</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyzed Feed</CardTitle>
            <CardDescription>{feedType === "homogeneous" ? "Homogeneous Feed" : "Heterogeneous Feed"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative rounded-md overflow-hidden">
              <Image src={imageUrl || "/placeholder.svg"} alt="Analyzed Feed" fill className="object-cover" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutritional Analysis</CardTitle>
            <CardDescription>Key nutritional components detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nutritionalInsights.map((insight, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{insight.nutrient}</p>
                    <p className="text-sm text-gray-500">{insight.recommendation}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{insight.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>Based on your feed analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p>Your feed sample shows good overall nutritional balance with a few areas for improvement:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The protein content is optimal for livestock growth and methane reduction.</li>
              <li>Consider reducing fiber content slightly to improve digestibility.</li>
              <li>Mineral content is slightly below optimal levels - consider supplementation.</li>
              <li>The starch-to-fiber ratio is well-balanced for rumen health.</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#2c4657]" onClick={() => setShowChatBot(true)}>
            <MessageCircle className="mr-2" size={16} />
            Chat with AI for Detailed Insights
          </Button>
        </CardFooter>
      </Card>

      {showChatBot && (
        <ChatBot
          initialMessages={[
            {
              type: "bot",
              text: "I've analyzed your feed sample. What specific aspects would you like to know more about?",
            },
          ]}
          feedContext={feedType}
        />
      )}
    </div>
  )
}

