"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatBotProps {
  initialMessages?: { type: "user" | "bot"; text: string }[]
  feedContext?: string
}

export default function ChatBot({ initialMessages, feedContext }: ChatBotProps) {
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<{ type: "user" | "bot"; text: string }[]>(
    initialMessages || [
      {
        type: "bot",
        text: "Hello! I'm your FeedSmart AI assistant. How can I help you with livestock nutrition today?",
      },
    ],
  )

  const sendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setChatMessages((prev) => [...prev, { type: "user", text: message }])

    // Simulate AI response based on context
    setTimeout(() => {
      let botResponse =
        "Based on your feed analysis, I recommend increasing protein content by 2% for optimal nutrition and reduced methane emissions. Would you like more specific recommendations?"

      if (feedContext) {
        botResponse = `Based on your ${feedContext} feed analysis, I recommend adjusting the protein-to-fiber ratio for optimal nutrition and reduced methane emissions. The current protein content is good, but you might want to consider reducing fiber slightly. Would you like more specific recommendations?`
      }

      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: botResponse,
        },
      ])
    }, 1000)

    setMessage("")
  }

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#2c4657] rounded-full flex items-center justify-center shadow-lg z-10"
      >
        <MessageCircle className="text-white" size={24} />
      </button>

      {/* Chatbot Dialog */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-white rounded-lg w-full max-w-md h-[500px] flex flex-col">
            <div className="p-4 bg-[#2c4657] text-white rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">FeedSmart AI Assistant</h3>
              <button onClick={() => setChatOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.type === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-[#2c4657] text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    } max-w-[80%]`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about feed nutrition..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button onClick={sendMessage} className="bg-[#2c4657]">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

