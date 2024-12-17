import { useState, forwardRef, type InputHTMLAttributes } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "w-full rounded-lg border bg-white pl-10 pr-10 py-2 text-base placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-600/50",
            error
              ? "border-red-500 focus:ring-red-600/50"
              : "border-gray-200",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

