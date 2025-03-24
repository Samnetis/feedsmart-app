"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import LoginScreen from "@/components/login-screen"
import LoadingAnimation from "@/components/loading-animation"

export default function Home() {
  const [progress, setProgress] = useState(0)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const totalTime = 10000 // 10 seconds
    const intervalTime = 100 // Update every 100ms
    const steps = totalTime / intervalTime

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 100 / steps
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setShowLogin(true)
          }, 500) // Small delay after completion
          return 100
        }
        return newProgress
      })
    }, intervalTime)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AnimatePresence mode="wait">
        {!showLogin ? (
          // Splash Screen
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-screen w-full flex-col items-center justify-between bg-white"
          >
            {/* Top Logos */}
            <div className="w-full pt-4 px-6 flex justify-between items-center">
              <Image
                src="/msu-logo.png"
                width={200}
                height={200}
                alt="Spartan Logo"
                className="h-10 w-10"
              />
              <Image src="/climdes-logo.png" width={120} height={40} alt="CLIMDES Logo" className="h-10" />
            </div>

            {/* Center Content */}
            <motion.div
              className="flex flex-col items-center justify-center py-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col items-center gap-1">
                <motion.h1
                  className="text-8xl font-bold text-primary mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  FeedSmart
                </motion.h1>
              </div>

              {/* Loading Animation */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <LoadingAnimation progress={progress} />
              </motion.div>
            </motion.div>

            {/* Bottom Section */}
            <div className="w-full mt-auto">
              <div className="bg-primary/10 py-6 px-8">
                <div className="flex justify-between items-center">
                  <Image
                    src="/GMH-logo.png"
                    width={120}
                    height={40}
                    alt="Climate Mitigation Hub"
                    className="h-10"
                  />
                  <Image
                    src="/UDAVIS-logo.png"
                    width={120}
                    height={40}
                    alt="UC Davis"
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Login Screen Component
          <LoginScreen key="login" />
        )}
      </AnimatePresence>
    </main>
  )
}