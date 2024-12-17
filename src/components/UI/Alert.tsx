import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface AlertProps {
  type: 'success' | 'warning' | 'danger'
  message: string
  onClose: () => void
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-black border-green-600 text-gray-100'
      case 'warning':
        return 'bg-black border-yellow-500 text-gray-100'
      case 'danger':
        return 'bg-black border-red-600 text-gray-100'
      default:
        return ''
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 w-11/12 sm:w-1/3 p-5 rounded-lg border-l-4 shadow-lg ${getAlertStyles()} animate-slide-down`}
      style={{ zIndex: 50 }}
    >
      <div className="flex justify-between items-center">
        <span className="font-normal Poppins">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-100 hover:text-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5 font-semibold" />
        </button>
      </div>
    </div>
  )
}

export default Alert