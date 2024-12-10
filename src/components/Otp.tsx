import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./UI/Button"
import { Card, CardContent } from "./UI/Card"
import { Input } from "./UI/Input"
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react'
import Alert from "./UI/Alert"

interface OtpVerificationProps {
  email: string
}

const Otp = ({ email }: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(43)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
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

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
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
      const res = await fetch(`${url}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: otp.join(""),
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-blue-600">
      <Card className="w-full max-w-xl bg-white shadow-sm">
        <CardContent className="p-6">
          <button 
            onClick={() => navigate(-1)} 
            className="mb-6 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-500" />
          </button>

          <div className="mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-gray-600" />
            </div>
            <h1 className="text-3xl font-semibold mb-3">
              Verify Your Email
            </h1>
            <p className="text-lg text-gray-600">
              Please enter the code we emailed you<br />
              {email}
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className={`w-full h-20 text-center text-[30px] font-medium rounded-lg 
                  ${digit ? 'bg-[#D1F2D9] border-[#D1F2D9]' : 'bg-gray-50 border-gray-200'} 
                  focus:border-gray-300 focus:ring-0`}
              />
            ))}
          </div>
          
          {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}

          <Button
            onClick={handleSubmit}
            disabled={loading || otp.includes("")}
            className="w-full h-14 mb-4 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 text-lg"
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

