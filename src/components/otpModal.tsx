import React, { useState } from "react";

interface OtpModalProps {
  onClose: () => void; // Function to close the modal
}

const OtpModal: React.FC<OtpModalProps> = ({ onClose }) => {
  // State to hold OTP digits
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Adjust the length as needed

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) { // Allow only single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input if current one is filled
      if (value && index < otp.length - 1) {
        (document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement)?.focus();
      }
    }
  };

  // Handle key down for navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index]) {
      // Focus previous input on backspace if current is empty
      if (index > 0) {
        (document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement)?.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-md shadow-lg w-[100%] max-w-lg mx-4"> {/* Made container responsive */}
        <h2 className="text-2xl sm:text-3xl text-gray-100 font-semibold text-center">Enter OTP</h2>
        
        {/* OTP Input Fields */}
        <div className="flex justify-between mt-4 space-x-2"> {/* Added space between inputs */}
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              placeholder="-"
              className="w-12 h-12 sm:w-16 sm:h-16 border rounded text-center text-2xl sm:text-3xl focus:outline-none focus:ring focus:ring-blue-500" // Responsive input size
            />
          ))}
        </div>

        <div className="flex flex-col mt-6 space-y-4"> {/* Flex column for buttons */}
          <button onClick={onClose} className="w-full px-4 py-3 bg-blue-500 text-white rounded-full text-base sm:text-md">
            Verify Email Address
          </button>
          <button className="w-full px-4 py-3 bg-gray-500 text-gray-100 rounded-full text-base sm:text-md">
            Resend OTP Digits
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
