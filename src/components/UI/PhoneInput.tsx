import { forwardRef, type InputHTMLAttributes } from 'react'
import { Phone } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <div className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center">
          <span className="text-gray-500 border-r border-gray-200 pr-2">+234</span>
        </div>
        <input
          type="tel"
          className={cn(
            "w-full rounded-lg border bg-white pl-24 pr-3 py-2 text-base placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-600/50",
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

PhoneInput.displayName = "PhoneInput"

