'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>
            <div className="text-sm mt-2 font-medium">{step.title}</div>
            <div className="text-xs text-muted-foreground">{step.description}</div>
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-8 w-[calc(100%-2rem)] h-[2px]">
                <div className="w-full h-full bg-gray-200" />
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

