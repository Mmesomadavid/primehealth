"use client"

import { useState, FormEvent } from "react"
import { User, Mail, Lock, Eye, EyeOff, Hospital, Phone } from 'lucide-react'
import { Link } from "react-router-dom"
import { Button } from "../../components/UI/Button"
import { Input } from "../../components/UI/Input"
import { Label } from "../../components/UI/Label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card"
import { CustomRadioGroup, RadioOption } from "../../components/UI/custom-radio-group"
import { Checkbox } from "../../components/UI/Checkbox"
import Alert from "../../components/UI/Alert"
import Otp from "../../components/Otp"
import Logo from '../../assets/logo-black.svg'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    accountType: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL

  const accountOptions: RadioOption[] = [
    {
      value: "hospital",
      label: "Healthcare Organization",
      description: "For hospitals, clinics, and healthcare providers",
      icon: <Hospital className="h-14 w-14 bg-primary/10 text-primary p-4 rounded-full" />,
    },
    {
      value: "doctor",
      label: "Medical Professional",
      description: "For doctors and health practitioners",
      icon: <User className="h-14 w-14 bg-primary/10 text-primary p-4 rounded-full" />,
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setSuccess(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return <Otp email={formData.email} />
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <img src={Logo} alt="Logo" className="h-8" />
        </div>
        <Card className="mx-auto max-w-[550px] border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Let's get started</CardTitle>
            <CardDescription>
              Complete the form below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      className="pl-10"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Phone</Label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +234
                    </span>
                    <Phone className="absolute left-[4.5rem] top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter Phone Number"
                      className="pl-10 rounded-l-none"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Account Type</Label>
                  <CustomRadioGroup
                    options={accountOptions}
                    value={formData.accountType}
                    onChange={(value) => setFormData(prev => ({ ...prev, accountType: value }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </div>

              {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}


              <Button 
                type="submit" 
                className="w-full bg-blue-700 text-sm text-white"
                disabled={!agreedToTerms || loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block lg:flex-1">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/prime-health-611ef.appspot.com/o/auth%2Fpexels-thirdman-5327656.jpg?alt=media&token=c05959ec-ccc8-455b-93b4-ca8463bf4019"
          alt="Registration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}

