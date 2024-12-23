'use client'

import { Check } from 'lucide-react'
import { cn } from "../lib/utils"

interface Step {
  title: string
  isCompleted: boolean
  isCurrent: boolean
}

interface ProgressStepsProps {
  steps: Step[]
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="relative">
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full border-2",
                step.isCompleted ? "bg-primary border-primary" : "border-gray-300",
                step.isCurrent && !step.isCompleted && "border-primary"
              )}
            >
              {step.isCompleted ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <span className={cn(
                  "text-sm font-medium",
                  step.isCurrent ? "text-primary" : "text-gray-500"
                )}>
                  {index + 1}
                </span>
              )}
            </div>
            <span className={cn(
              "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm",
              step.isCurrent ? "text-primary font-medium" : "text-gray-500"
            )}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "h-[2px] w-[calc(100%-2rem)] mx-4",
              step.isCompleted ? "bg-primary" : "bg-gray-300"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}

