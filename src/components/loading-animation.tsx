"use client"

import Image from "next/image"

interface LoadingAnimationProps {
  progress: number
}

export default function LoadingAnimation({ progress }: LoadingAnimationProps) {
  return (
    <div className="relative flex flex-col items-center justify-center mt-8">
      {/* Rotating Circle Animation */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Logo in the center */}
        <div className="absolute z-10 flex items-center justify-center w-full h-full">
          <Image
            src="/feedsmart-logo.png"
            width={80}
            height={80}
            alt="Feedsmart Logo"
            className="h-20 w-20 object-contain"
          />
        </div>

        {/* Rotating Circle using CSS animation */}
        <div className="absolute w-full h-full animate-spin" style={{ animationDuration: "1.5s" }}>
          <div
            className="absolute w-[80px] h-[80px] rounded-full"
            style={{
              top: "calc(50% - 40px)",
              left: "calc(50% - 40px)",
              borderWidth: "4px",
              borderColor: "hsl(var(--primary))",
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
            }}
          />
        </div>
      </div>

      {/* Progress Text */}
      <div className="mt-6 text-center">
        <p className="text-primary font-medium">Loading... {Math.round(progress)}%</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-secondary rounded-full mt-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: "hsl(var(--primary))",
            }}
          />
        </div>
      </div>
    </div>
  )
}

