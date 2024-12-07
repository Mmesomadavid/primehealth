import { useState, useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./UI/Alert";
import { contextData } from "../context/AuthContext";
import verifyemailImg from '../assets/email-animation.gif';


export interface OtpProps {
  email: string;
}

const Otp: React.FC<OtpProps> = ({ email }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { login } = contextData();

  const handleChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
    if (/^\d*$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);

      const lastIndex = newOtp.length - 1;
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus();
      }
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch(`${url}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) setSuccess("OTP sent successfully!");
      else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
    }

    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${url}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: otp.join(""),
          email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await login(data);
        data.accountType === "doctor"
          ? navigate("/dashboard/doctor/")
          : navigate("/dashboard/hospital/");
      } else throw new Error(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-800 ">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <img src={verifyemailImg} alt="email Verification" className="w-26 h-26" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verify your email</h2>
          <p className="text-gray-500 text-center">
            We have successfully sent a code to<br />
            <span className="font-bold underline">{email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-2xl font-semibold border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <span className="text-gray-500">Didn't get your code? </span>
          <button
            onClick={handleResendOtp}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Send a new code
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || otp.includes("")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {error && <Alert type="danger" message={error as string} onClose={() => console.log("Alert closed")} />}
        {success && <Alert type="success" message={success as string} onClose={() => console.log("Alert closed")} />}
      </div>
    </div>
  );
};

export default Otp;