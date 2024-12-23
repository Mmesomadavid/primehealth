'use client'

import * as React from "react"
import { cn } from "../lib/utils"

interface ProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({
  value,
  size = 36,
  strokeWidth = 5,
  className
}, ref) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div 
      ref={ref}
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-blue-600 transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
        {Math.round(value)}%
      </div>
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }

