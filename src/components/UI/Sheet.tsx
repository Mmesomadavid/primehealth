import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface SheetProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  position?: 'right' | 'left'
  className?: string
}

export const Sheet: React.FC<SheetProps> = ({
  children,
  isOpen,
  onClose,
  position = 'right',
  className = '',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ [position]: '-100%' }}
            animate={{ [position]: 0 }}
            exit={{ [position]: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`absolute inset-y-0 ${position}-0 w-full max-w-md bg-white shadow-lg ${className}`}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

interface SheetContentProps {
  children: React.ReactNode
  className?: string
}

export const SheetContent: React.FC<SheetContentProps> = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
)

interface SheetTriggerProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`p-2 ${className}`}>
    {children}
  </button>
)
