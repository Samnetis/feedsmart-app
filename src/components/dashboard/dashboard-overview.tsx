"use client"

import { useState } from "react"
import { Package, BarChart2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeedAnalysisView from "./feed-analysis-view"

interface DashboardOverviewProps {
  darkMode: boolean
  user: any
  setActiveTab: (tab: string) => void
}

export default function DashboardOverview({ darkMode, user, setActiveTab }: DashboardOverviewProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null)

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

  if (selectedAnalysis) {
    return <FeedAnalysisView analysis={selectedAnalysis} onBack={() => setSelectedAnalysis(null)} darkMode={darkMode} />
  }

  return (
    <>
      {/* Welcome Section */}
      <div className={`mb-6 ${darkMode ? "text-white" : "text-[#2c4657]"}`}>
        <h2 className="text-xl font-semibold">Welcome {user?.name?.split(" ")[0] || "User"}!</h2>
        <p className="text-sm text-gray-500 mt-1">
          Monitor your feed analyses and get nutritional insights for your livestock.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Feed Analysis Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-[#e8f4f0]"}`}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-bold">{feedData.totalFeeds}</h4>
                <p className="text-sm text-gray-500">Total Feeds</p>
              </div>
              <div className={`p-2 rounded-md ${darkMode ? "bg-gray-700" : "bg-white/60"}`}>
                <Package size={20} className="text-[#4ea58d]" />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-[#e8f4f0]"}`}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-bold">{feedData.analyzedFeeds}</h4>
                <p className="text-sm text-gray-500">Analyzed Feeds</p>
              </div>
              <div className={`p-2 rounded-md ${darkMode ? "bg-gray-700" : "bg-white/60"}`}>
                <BarChart2 size={20} className="text-[#4ea58d]" />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-[#e8f4f0]"}`}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-bold">{feedData.savedAnalyses}</h4>
                <p className="text-sm text-gray-500">Saved Analyses</p>
              </div>
              <div className={`p-2 rounded-md ${darkMode ? "bg-gray-700" : "bg-white/60"}`}>
                <FileText size={20} className="text-[#4ea58d]" />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-[#f9efe8]"}`}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-bold">{feedData.pendingAnalyses}</h4>
                <p className="text-sm text-gray-500">Pending Analyses</p>
              </div>
              <div className={`p-2 rounded-md ${darkMode ? "bg-gray-700" : "bg-white/60"}`}>
                <Package size={20} className="text-[#d97c4e]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Recent Feed Analyses</h3>
          <Button variant="outline" size="sm" onClick={() => setActiveTab("feed-analysis")}>
            New Analysis
          </Button>
        </div>
        <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`text-xs ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                <tr>
                  <th className="px-4 py-3 text-left">Feed Name</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentAnalyses.map((analysis) => (
                  <tr key={analysis.id} className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <td className="px-4 py-3">{analysis.name}</td>
                    <td className="px-4 py-3">{analysis.date}</td>
                    <td className="px-4 py-3">{analysis.type}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {analysis.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedAnalysis(analysis)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
        <h3 className="font-medium mb-3">Nutritional Tips</h3>
        <div className="space-y-2 text-sm">
          <p>• Optimal protein levels can reduce methane emissions by up to 15%.</p>
          <p>• Balanced fiber content improves digestion and nutrient absorption.</p>
          <p>• Regular feed analysis can help identify nutritional deficiencies early.</p>
          <p>• Seasonal adjustments to feed composition can improve livestock health.</p>
        </div>
      </div>
    </>
  )
}

