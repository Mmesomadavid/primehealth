import { type ReactNode, forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2 text-base placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-600/50",
            icon && "pl-10",
            error
              ? "border-red-500 focus:ring-red-600/50"
              : "border-gray-200",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

