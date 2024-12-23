import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, HelpCircle } from 'lucide-react'
import { contextData } from "../../context/AuthContext"
import logo from "../../assets/logo-small.png"
import Alert from "../../components/UI/Alert"
import { Button } from "../../components/UI/Button"
import Otp from "../../components/Otp"

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL
  const { login } = contextData()
  const navigate = useNavigate()

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  const resendOtp = async (): Promise<void> => {
    setSuccess(false)
    try {
      const res = await fetch(`${url}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: 'no-cors',
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) setSuccess(true)
      else throw new Error(data.message)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()

    if (email.length < 7)
      return setError("Your email must be at least 7 characters")
    if (!email.includes("@")) return setError("Invalid Email")
    if (password.length < 5)
      return setError("Your password must be at least 5 characters")

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        mode: 'no-cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await res.json()
      await login(data) // This now expects { token, user } object
      navigate(data.user.accountType === "doctor" ? "/dashboard/doctor/" : "/dashboard/hospital/")
    } catch (err: any) {
      setError(err.message)
      if (err.message === "Email not verified") await resendOtp()
    } finally {
      setLoading(false)
    }
  }

  if (error === "Email not verified" && success) {
    return <Otp email={email} />
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left: Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex justify-center items-center bg-white px-4 relative"
      >
        <div className="absolute top-4 left-4">
          <Link to="/">
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-8 w-auto"
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            Help
          </Button>
        </div>
        <div className="w-full max-w-md space-y-8 p-8">
          <div className="text-left">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
              Hey, Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <Link
                to="/password-reset"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-6 text-md font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign In
              </Button>
            </div>

            {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>

      {/* Right: Feature Showcase */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 bg-blue-700 p-12 flex-col justify-between"
      >
        <div className="max-w-lg">
          <h1 className="text-4xl text-left font-semibold text-white mb-4">
            Effortlessly Manage Your Healthcare Workforce with PrimeHealth
          </h1>
          <p className="text-blue-100">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="mt-8">
          <img
            src="/placeholder.svg?height=400&width=500"
            alt="Dashboard Preview"
            className="rounded-lg shadow-xl"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Login

