import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, MailIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-black.svg'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <img src={Logo} alt="Primehealth Logo" className="h-12 w-auto" />
        <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
          Forgot Password?
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Form Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Log in to your account
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back to Primehealth, please enter your details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-lg border border-gray-200 pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full rounded-lg border border-gray-200 pl-10 pr-10 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </form>

          {/* Create account link */}
          <div className="text-center">
            <Link
              to="/register"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              Don't have an account? Create one
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login

