"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "./UI/Button"
import { Menu } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl">
              ✱
            </Link>
            <Link to="/business-finance" className="hidden md:block text-sm text-gray-600">
              / Business Finance
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/creators" className="text-sm text-gray-600 hover:text-gray-900">
              Creators
            </Link>
            <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            <Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900">
              Download
            </Link>
            <Link to="/support" className="text-sm text-gray-600 hover:text-gray-900">
              Support
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm">
              Log in
            </Link>
            <Link to="/register" className="text-sm relative">
              Sign Up for free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              <Link to="/creators" className="text-sm text-gray-600">
                Creators
              </Link>
              <Link to="/how-it-works" className="text-sm text-gray-600">
                How it Works
              </Link>
              <Link to="/faq" className="text-sm text-gray-600">
                FAQ
              </Link>
              <Link to="/support" className="text-sm text-gray-600">
                Support
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="ghost" className="w-full justify-center">
                  Log in
                </Button>
                <Button variant="default" className="w-full justify-center relative">
                  Sign Up
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    It&apos;s Free
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation