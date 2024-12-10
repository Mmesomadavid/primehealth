"use client"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dashboardUI from '../../assets/product-image.png'
import { Eye, EyeOff } from 'lucide-react'
import { contextData } from '../../context/AuthContext'
import { Button } from '../../components/UI/Button'
import { Input } from '../../components/UI/Input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card"
import Alert from '../../components/UI/Alert'
import Logo from '../../assets/full-black.png'
import Otp from '../../components/Otp'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailNotVerified, setEmailNotVerified] = useState(false)
  const { login } = contextData()
  const navigate = useNavigate()
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setEmailNotVerified(false)

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
        if (data.message === "Email not verified") {
          setEmailNotVerified(true)
        } else {
          throw new Error(data.message)
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (emailNotVerified) {
    return <Otp email={formData.email} />
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-between p-8 lg:p-12">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="Logo" className="h-10" />
          <Button variant="ghost" className="text-sm" onClick={() => navigate('/forgot-password')}>
            Forgot password?
          </Button>
        </div>

        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-semibold">Get Started Now</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2.5 h-4 w-4 px-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}

                <Button type="submit" className="w-full bg-blue-700 text-white text-sm" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:block bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/80" />
        <div className="relative h-full p-12 text-white">
          <h2 className="text-4xl font-semibold mb-4">
            The simplest way to manage your workforce
          </h2>
          <img
            src={dashboardUI}
            alt="Dashboard Preview"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[100%] rounded-t-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

