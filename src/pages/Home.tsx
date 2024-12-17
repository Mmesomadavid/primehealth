import { Button } from "../components/UI/Button"
import { Calendar, Clock, Users, Bell } from 'lucide-react'
import {Link} from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="h-4 w-4 rounded-full bg-blue-600" />
                <div className="h-4 w-4 rounded-full bg-blue-400" />
              </div>
              <span className="text-xl font-semibold">Primehealth</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="#solutions" className="text-sm text-gray-600 hover:text-gray-900">Solutions</a>
              <a href="#resources" className="text-sm text-gray-600 hover:text-gray-900">Resources</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign in
              </Button>
              <Button>
                <Link to="/register" className="border p-2 border-blue-600 rounded-lg">Sign up for free</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-white" style={{
            backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute left-4 top-1/3 md:left-20">
          <div className="bg-yellow-100 p-4 rounded-lg shadow-lg rotate-[-6deg] max-w-[200px]">
            <Calendar className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-sm">Schedule appointments and manage patient visits efficiently</p>
          </div>
        </div>

        <div className="absolute right-4 top-1/4 md:right-20">
          <div className="bg-white p-4 rounded-lg shadow-lg rotate-[6deg]">
            <div className="flex items-start gap-3">
              <Bell className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium mb-1">Reminders</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Patient Check-up</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Staff Meeting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight text-gray-900 sm:text-7xl">
            Think, plan, and manage
            <span className="block text-4xl text-gray-500 sm:text-6xl mt-2">
              all your healthcare services
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Streamline your healthcare operations with our comprehensive hospital management system. 
            Enhance patient care and boost operational efficiency.
          </p>

          <div className="mt-10">
            <Button size="lg" className="h-12 px-8 text-base">
              <Link to="/signup" className="bg-blue-600 p-4 text-white rounded-lg">
                Get Started Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

