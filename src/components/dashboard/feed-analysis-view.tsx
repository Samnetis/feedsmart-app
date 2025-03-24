"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import ChatBot from "./chat-bot"

interface FeedAnalysisViewProps {
  analysis: any
  onBack: () => void
  darkMode: boolean
}

export default function FeedAnalysisView({ analysis, onBack, darkMode }: FeedAnalysisViewProps) {
  const [showInsights, setShowInsights] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false)

  // Nutritional insights
  const nutritionalInsights = [
    { nutrient: "Protein", value: "18.5%", recommendation: "Optimal (15-20%)" },
    { nutrient: "Fiber", value: "22.3%", recommendation: "Slightly high (target: 18-22%)" },
    { nutrient: "Starch", value: "32.1%", recommendation: "Optimal (30-35%)" },
    { nutrient: "Fat", value: "4.2%", recommendation: "Optimal (3-5%)" },
    { nutrient: "Minerals", value: "8.7%", recommendation: "Slightly low (target: 9-11%)" },
  ]

  // Mock data for charts
  const pieData = [
    { name: "Protein", value: 18.5, color: "#4ea58d" },
    { name: "Fiber", value: 22.3, color: "#d97c4e" },
    { name: "Starch", value: 32.1, color: "#a8c5da" },
    { name: "Fat", value: 4.2, color: "#2c4657" },
    { name: "Minerals", value: 8.7, color: "#6c757d" },
    { name: "Other", value: 14.2, color: "#adb5bd" },
  ]

  // Historical data for this feed
  const historicalData = [
    { date: "Jun", protein: 17.2, fiber: 23.1, starch: 31.5 },
    { date: "Jul", protein: 17.8, fiber: 22.8, starch: 31.8 },
    { date: "Aug", protein: 18.1, fiber: 22.5, starch: 32.0 },
    { date: "Sep", protein: 18.3, fiber: 22.4, starch: 32.1 },
    { date: "Oct", protein: 18.5, fiber: 22.3, starch: 32.1 },
  ]

  if (showInsights) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setShowInsights(false)}>
            <ChevronRight className="rotate-180 mr-1" size={16} />
            Back to Analysis
          </Button>
          <h2 className="text-xl font-semibold">Detailed Insights: {analysis.name}</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Based on your feed analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>
                Your {analysis.name} sample shows good overall nutritional balance with a few areas for improvement:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The protein content is optimal for livestock growth and methane reduction.</li>
                <li>Consider reducing fiber content slightly to improve digestibility.</li>
                <li>Mineral content is slightly below optimal levels - consider supplementation.</li>
                <li>The starch-to-fiber ratio is well-balanced for rumen health.</li>
              </ul>

              <p className="mt-4 font-medium">Methane Reduction Potential:</p>
              <p>
                Based on our analysis, optimizing this feed composition could reduce methane emissions by approximately
                12-15% compared to conventional feeds.
              </p>

              <p className="mt-4 font-medium">Suggested Adjustments:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Reduce fiber content by 1-2% to improve digestibility</li>
                <li>Increase mineral content by 1% to reach optimal levels</li>
                <li>
                  Consider adding a natural feed additive like seaweed extract (0.2%) to further reduce methane
                  emissions
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#2c4657]" onClick={() => setShowChatBot(true)}>
              Chat with AI for More Detailed Recommendations
            </Button>
          </CardFooter>
        </Card>

        {showChatBot && (
          <ChatBot
            initialMessages={[
              {
                type: "bot",
                text: `I've analyzed your ${analysis.name} sample. What specific aspects would you like to know more about?`,
              },
            ]}
            feedContext={analysis.name}
          />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronRight className="rotate-180 mr-1" size={16} />
          Back to Dashboard
        </Button>
        <h2 className="text-xl font-semibold">Feed Analysis: {analysis.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feed Composition</CardTitle>
            <CardDescription>Nutritional breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historical Trends</CardTitle>
            <CardDescription>Nutrient changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="protein" stroke="#4ea58d" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="fiber" stroke="#d97c4e" />
                  <Line type="monotone" dataKey="starch" stroke="#a8c5da" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

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
        <CardFooter>
          <Button className="w-full" onClick={() => setShowInsights(true)}>
            Get Detailed Insights
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feed Sample</CardTitle>
            <CardDescription>{analysis.type} Feed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative rounded-md overflow-hidden bg-gray-100">
              <Image
                src={`/placeholder.svg?height=300&width=500&text=${analysis.name}`}
                alt={analysis.name}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Feed Name:</span>
                <span>{analysis.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Feed Type:</span>
                <span>{analysis.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Analysis Date:</span>
                <span>{analysis.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">{analysis.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Methane Reduction Potential:</span>
                <span>12-15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

