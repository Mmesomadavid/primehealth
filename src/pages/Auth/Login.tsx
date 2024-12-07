'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { contextData } from '../../context/AuthContext'
import Alert from '../../components/UI/Alert'
import Otp from '../../components/Otp'
import Logo from '../../assets/logo-black.svg'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/UI/Card"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL
  const { login } = contextData()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const resendOtp = async (): Promise<void> => {
    setSuccess(null)

    try {
      const res = await fetch(`${url}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await res.json()

      if (res.ok) setSuccess(data.message)
      else throw new Error(data.message)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (formData.email.length < 7 || !formData.email.includes("@"))
      return setError("Please enter a valid email address")
    if (formData.password.length < 5)
      return setError("Your password must be at least 5 characters")

    setLoading(true)

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        await login(data)
        navigate(data.accountType === "doctor" ? "/dashboard/doctor" : "/dashboard/hospital")
      } else {
        throw new Error(data.message)
      }
    } catch (err: any) {
      setError(err.message)
      if (err.message === "Email not verified") await resendOtp()
    } finally {
      setLoading(false)
    }
  }

  if (error === "Email not verified" && success) {
    return <Otp email={formData.email} />
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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Log in to your account
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Welcome back to Primehealth, please enter your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-lg border border-gray-200 pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
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
                    onChange={handleChange}
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

              {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}
              {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Create account link */}
            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                Don't have an account? Create one
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Login

