import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./UI/Button"
import { Card, CardContent } from "./UI/card"
import { Input } from "./UI/Input"
import {  ArrowLeft, ArrowRight } from 'lucide-react'
import Alert from "./UI/Alert"
import emailAnimation from '../assets/email-animation.gif'
import logo from "../assets/logo-white.svg"

interface OtpVerificationProps {
  email: string
}

const Otp = ({ email }: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(43)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [minutes, seconds])

  const handleChange = (value: string) => {
    if (!/^\d*$/.test(value)) return
    setOtp(value.slice(0, 6))
  }

  const handleResendOtp = async () => {
    try {
      const res = await fetch(`${url}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setMinutes(2)
        setSeconds(43)
      } else {
        throw new Error("Failed to resend OTP")
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${url}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: otp,
          email,
        }),
      })
      const data = await res.json()
      
      if (res.ok) {
        navigate(data.accountType === "doctor" ? "/dashboard/doctor" : "/dashboard/hospital")
      } else {
        throw new Error(data.message)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-blue-600 relative">
      <img src={logo} alt="Logo" className="absolute top-4 left-4 h-8" />
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-1/2 left-4 -translate-y-1/2 hover:bg-blue-700 p-2 rounded-full transition-colors"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>

      <Card className="w-full max-w-xl bg-white shadow-sm border-none relative">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <img src={emailAnimation} className="h-20 w-20" />
        </div>
        <CardContent className="p-6 pt-20">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold mb-3">
              Verify Your Email
            </h1>
            <p className="text-lg text-gray-600">
              Please enter the code we emailed you<br />
              {email}
            </p>
          </div>

          <div className="mb-6">
            <Input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full h-20 text-center text-[30px] font-medium rounded-lg 
                bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              placeholder="••••••"
            />
          </div>
          
          {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}

          <Button
            onClick={handleSubmit}
            disabled={loading || otp.length !== 6}
            className="w-full h-14 mb-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 text-lg"
          >
            {loading ? "Verifying..." : (
              <>
                Continue
                <ArrowRight className="h-6 w-6" />
              </>
            )}
          </Button>

          <div className="text-center text-base text-gray-600">
            {minutes > 0 || seconds > 0 ? (
              <p>Resend code in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            ) : (
              <Button
                variant="link"
                className="p-0 h-auto text-gray-600 hover:text-gray-800 text-base"
                onClick={handleResendOtp}
              >
                Resend code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Otp

