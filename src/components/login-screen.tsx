"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginScreen() {
  const router = useRouter()

  const handleLogin = () => {
    router.push("/auth/login")
  }

  const handleSignUp = () => {
    router.push("/auth/register")
  }

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex min-h-screen w-full flex-col bg-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-16 h-16">
        <div className="absolute top-8 left-8 w-8 h-8 text-[#0D6A54]">+</div>
      </div>
      <div className="absolute top-14 right-1/4 w-3 h-3 rounded-full bg-[#0D6A54]/30"></div>
      <div className="absolute top-24 right-10 w-2 h-2 rounded-full bg-[#0D6A54]"></div>

      {/* Dot Pattern */}
      <div className="absolute top-20 right-0">
        <div className="grid grid-cols-6 gap-3">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#0D6A54]/20"></div>
          ))}
        </div>
      </div>

      {/* Bottom Dot Pattern */}
      <div className="absolute bottom-40 left-0">
        <div className="grid grid-cols-6 gap-3">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#0D6A54]/20"></div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 right-10 w-4 h-4 rounded-full bg-[#0D6A54]"></div>
      <div className="absolute left-10 bottom-1/3 w-3 h-3 rounded-full bg-[#0D6A54]"></div>

      {/* Top Navigation */}
      <div className="w-full pt-4 px-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <Image
            src="/msu-logo.png?height=40&width=40"
            width={40}
            height={40}
            alt="Spartan Logo"
            className="h-10 w-10"
          />
          <span className="font-medium text-gray-800">FeedSmart</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8">
            <a href="#" className="text-gray-600 hover:text-[#0D6A54]">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0D6A54]">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0D6A54]">
              Resources
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0D6A54]">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden md:inline">Call us:</span>
            <span className="text-sm font-medium text-[#0D6A54] hidden md:inline">+1 800-123-4567</span>
          </div>
          <Button
            className="bg-[#0D6A54] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#0A5A46]"
            onClick={handleLogin}
          >
            Contact us <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full flex-1 px-6 py-12 md:py-0">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              We're <span className="text-[#0D6A54]">Premium</span> <br />
              Livestock <span className="text-[#0D6A54]">Nutrition</span> <br />
              Platform.
            </h1>

            <p className="text-gray-600 mt-6 max-w-md">
              Premium Insights for Optimal Livestock Nutrition towards Methane Reduction. From concept to
              implementation, we help you optimize your livestock feed.
            </p>

            <div className="flex gap-4 mt-8">
              <Button
                className="bg-[#0D6A54] text-white px-8 py-3 rounded-md font-medium hover:bg-[#0A5A46] transition-all"
                onClick={handleLogin}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-all"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center mt-12 md:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative">
            <Image src="/feedsmart-logo.png" width={300} height={300} alt="Feedsmart Logo" className="relative z-10" />

            {/* Decorative elements around the logo */}
            <div className="absolute top-1/4 -left-16 w-12 h-12 rounded-full border-2 border-[#0D6A54]/30 z-0"></div>
            <div className="absolute bottom-1/4 right-0 w-16 h-16 rounded-full bg-[#0D6A54]/10 z-0"></div>
            <div className="absolute top-0 right-1/4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md z-20">
              <div className="w-5 h-5 text-[#0D6A54]">💡</div>
            </div>
            <div className="absolute bottom-10 left-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md z-20">
              <div className="w-6 h-6 text-[#0D6A54]">🌱</div>
            </div>
            <div className="absolute top-1/2 right-0 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md z-20">
              <div className="w-6 h-6 text-[#0D6A54]">💬</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="w-full mt-auto">
        <div className="bg-[#0D6A54]/10 py-6 px-8">
          <div className="flex justify-between items-center">
            <Image
              src="/GMH-logo.png?height=40&width=120"
              width={120}
              height={40}
              alt="Climate Mitigation Hub"
              className="h-10"
            />
            <Image src="/UDAVIS-logo.png?height=40&width=120" width={120} height={40} alt="UC Davis" className="h-10" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

