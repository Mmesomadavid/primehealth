"use client"

import { useState, FormEvent } from "react"
import { Button } from "../../components/UI/Button"
import { Input } from "../../components/UI/Input"
import { Label } from "../../components/UI/Label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/UI/Card"
import { CustomRadioGroup, RadioOption } from "../../components/UI/custom-radio-group"
import { Checkbox } from "../../components/UI/Checkbox"
import { Mail, Phone, Lock, Eye, EyeOff, Hospital, User } from 'lucide-react'
import { Link } from "react-router-dom"
import Otp from "../../components/Otp"
import Logo from '../../assets/full-black.png'
import Alert from "../../components/UI/Alert"

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
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
      label: "Signup as health organisation",
      description: "For hospitals, clinics, and healthcare providers",
      icon: <Hospital className="h-14 w-14 bg-gray-200 text-black p-4 rounded-full" />,
    },
    {
      value: "doctor",
      label: "Signup as Doctor",
      description: "For Doctor and Health Practitioners",
      icon: <User className="h-14 w-14 bg-gray-200 text-black p-4 rounded-full" />,
    },
  ]

  const calculatePasswordStrength = (password: string) => {
    return Math.min(100, (password.length / 12) * 100)
  }

  const passwordStrength = calculatePasswordStrength(formData.password)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!formData.email && !formData.phone) {
      setError("Either email or phone must be provided.")
      setLoading(false)
      return
    }

    try {
      console.log("Submitting form data:", formData)
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
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : 'An error occurred during registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return <Otp email={formData.email} />
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 overflow-y-auto p-8 lg:p-8">
        <div className="mb-8">
          <img src={Logo} alt="Prime Health Logo" width={150} height={50} />
        </div>
        <Card className="mx-auto max-w-[550px] border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold tracking-tight">Create Account</CardTitle>
            <CardDescription>
              Create Your Primehealth account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +234
                    </span>
                    <Phone className="absolute left-[4.5rem] top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-16 rounded-l-none"
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
                      placeholder="Enter your password"
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
                  <div className="h-1 w-full bg-gray-200 mt-2">
                    <div
                      className="h-1 bg-green-500 transition-all duration-300 ease-in-out"
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Label>Select Account Type</Label>
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
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary underline">
                    terms and conditions
                  </Link>
                </label>
              </div>

              {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}

              <Button className="w-full bg-blue-800 text-white" size="lg" type="submit" disabled={!agreedToTerms || loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary underline">
                  Log in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block lg:flex-1">
        <div className="relative h-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/prime-health-611ef.appspot.com/o/auth%2Fpexels-thirdman-5327647.jpg?alt=media&token=b2a8d5ee-e5a0-4b6f-9dc1-4a6737595ac0"
            alt="Testimonial"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-zinc-900/0" />
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Untitled&apos;s software helps us manage cash flow, financial reporting and payroll with ease. It&apos;s a great solution for startups looking for an efficient way to manage their finances all-in-one.
              </p>
              <footer className="text-sm">
                <p className="font-medium">Maya Rothwell</p>
                <p>Founder & CEO</p>
                <div className="mt-2">
                  <p className="font-medium">Open Ventures</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}

