import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/full-black.png';
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/50 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="logo" draggable="false" className='w-22 h-12' />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-8 items-center">
              <Link to="/home" className="text-sm text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/about" className="text-sm text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link to="/support" className="text-sm text-gray-700 hover:text-gray-900">
                Support
              </Link>
              <Link to="/download" className="text-sm text-gray-700 hover:text-gray-900">
                Download
              </Link>
              <div className="flex items-center space-x-3">
                <div className="h-4 w-px bg-gray-300"></div>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-blue-700 hover:bg-gray-800 transition-colors"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/home" className="block px-3 py-2 text-base text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2 text-base text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="/support" className="block px-3 py-2 text-base text-gray-700 hover:text-gray-900">
              Support
            </Link>
            <Link to="/download" className="block px-3 py-2 text-base text-gray-700 hover:text-gray-900">
              Download
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link to="/login" className="block px-3 py-2 text-base text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 mt-1 text-base text-white bg-black rounded-full text-center"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
