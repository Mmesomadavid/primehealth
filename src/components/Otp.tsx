import illustrationImage from '../assets/illustrations/email.svg'; // Replace with the correct path to your image

const Otp = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section: Illustration Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <img src={illustrationImage} alt="Illustration" className="max-w-full h-auto" />
      </div>

      {/* Right Section: OTP Input */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-semibold mb-6">Enter OTP</h2>
        <div className="flex space-x-2 mb-6">
          {/* 6 Digit OTP Input */}
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1} // Changed to a number
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <p className="text-gray-600">Enter the 6-digit code sent to your email/phone</p>
      </div>
    </div>
  );
};

export default Otp;
