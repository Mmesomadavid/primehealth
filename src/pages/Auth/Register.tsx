import React, { useState, ChangeEvent, FormEvent } from "react"
import { Link } from "react-router-dom"
import { MuiTelInput } from 'mui-tel-input'
import Otp from "../../components/Otp"
import { contextData } from '../../context/AuthContext'
import logo from "../../assets/logo-white.svg"
import Alert from "../../components/UI/Alert"
import { Button } from "../../components/UI/Button"
import { User, Hospital, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register: React.FC = () => {
  const [accountType, setAccountType] = useState<string>("none")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | null>(null)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL
  const { user } = contextData()

  const validateForm = (): string => {
    if (accountType === "none") return "Please select an account type"
    if (firstName.length < 2) return "First name must be at least 2 characters"
    if (lastName.length < 2) return "Last name must be at least 2 characters"
    if (email.length < 5 || !email.includes("@")) return "Please enter a valid email address"
    if (phone.length < 10) return "Please enter a valid phone number"
    if (password.length < 5) return "Your password must be at least 5 characters"
    return "success"
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setError(null)
    const { id, value } = e.target
    if (id === "firstName") setFirstName(value)
    else if (id === "lastName") setLastName(value)
    else if (id === "email") setEmail(value.toLowerCase())
    else if (id === "password") setPassword(value)
  }

  const handlePhoneChange = (value: string) => {
    setPhone(value)
  }

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const isValid = validateForm() === "success" ? true : setError(validateForm())

    if (isValid)
      try {
        setLoading(true)
        const res = await fetch(`${url}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            password,
            accountType,
          }),
        })

        const data = await res.json()

        if (res.ok) {
          setSuccess(data.message)
        } else throw new Error(data.message)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
  }

  if (success) {
    return <Otp email={email} />
  }

  return (
    !user && (
      <div className="flex min-h-screen">
        {/* Left: Content */}
        <div className="hidden w-1/2 bg-blue-600 p-12 lg:flex lg:flex-col">
          <div className="flex justify-between items-center mb-8">
            <Link to="/">
              <img className="h-8 w-auto" alt="logo" src={logo} />
            </Link>
            <Link to="/" className="text-gray-800 p-2 bg-white hover:text-gray-800 rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex-grow">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
              Effortless Healthcare Management for Every Practice & Organisation
            </h1>
            <p className="mb-12 text-lg text-gray-200">
              Our registration process is quick and easy, taking no more than 10
              minutes to complete.
            </p>
          </div>
          <div className="rounded-xl bg-blue-700 p-8 text-white mt-auto">
            <p className="mb-4 text-sm leading-relaxed">
              "I'm impressed with the results I've seen since starting to use
              Carepulse. The platform has streamlined my practice management
              significantly."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/12311410/pexels-photo-12311410.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Dr. Sarah Johnson"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Dr. Udoka</p>
                <p className="text-sm text-gray-300">Family Physician</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex w-full items-center justify-center px-4 sm:px-6 lg:w-1/2">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-4xl font-semibold text-gray-900">Get started</h2>
              <p className="mt-2 text-sm text-gray-600">
                Create your account now
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setAccountType("doctor")}
                      className={`flex items-center w-full p-4 border rounded-lg ${
                        accountType === "doctor" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                    >
                      <User className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <span className="font-medium">Doctor</span>
                        <p className="text-xs text-gray-500">For medical professionals</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType("hospital")}
                      className={`flex items-center w-full p-4 border rounded-lg ${
                        accountType === "hospital" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                    >
                      <Hospital className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <span className="font-medium">Hospital</span>
                        <p className="text-xs text-gray-500">For healthcare facilities</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <MuiTelInput
                      value={phone}
                      onChange={handlePhoneChange}
                      defaultCountry="NG"
                      className="block w-full py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="••••••••"
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
              </div>

              <div className="flex items-center gap-2">
                <input
                  checked
                  disabled
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <p className="text-sm text-gray-600">
                  I agree to Carepulse's{" "}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-blue-600 px-4 py-6 text-md font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Create Account
                </Button>
              </div>

              {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}
              {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default Register

