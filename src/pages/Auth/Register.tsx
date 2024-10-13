import Header from "../../components/Header";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import rightImg from '../../assets/images/onboard2.jpg';
import IconWrapper from "../../components/IconWrapper"; // Import the IconWrapper


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState(""); // State for Company Name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(""); // User type state
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingTimeout] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setIsTyping(true);

    if (isTypingTimeout) clearTimeout(isTypingTimeout);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col bg-white p-8 relative">
        {/* Align Header to the top left */}
        <div className="absolute top-0 left-0 p-4">
          <Header />
        </div>
        <form className="w-full max-w-md mt-20 mx-auto">
          {/* User Type Selection */}
          <div className="mb-4">
            <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
              I am a:
            </label>
            <select
              id="user-type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="Doctor">Health Organisation</option>
              <option value="Patient">Patient</option>
            </select>
          </div>

          {/* Conditionally Rendered Input Fields */}
          {userType === "Doctor" ? (
            // Company Name Input for Health Organisation
            <div className="mb-4">
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your company name"
                required
              />
            </div>
          ) : (
            // First Name and Last Name Inputs for Individual Users
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {userType === "Doctor" ? "Company Email" : "Email Address"}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={userType === "Doctor" ? "Enter your company email" : "Enter your email"}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${isTyping && !passwordsMatch ? 'border-red-500' : ''}`}
              placeholder="Re-enter your password"
              required
            />
            {isTyping && !passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I accept the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            disabled={!termsAccepted || !passwordsMatch || !userType}
          >
            Register
          </button>
          <p className="text-gray-700 text-center">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>

         {/* Divider with Social Auth */}
         <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
              <IconWrapper Icon={FcGoogle} style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} /> Sign up with Google
            </button>
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
              <IconWrapper Icon={FaApple} style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} /> Sign up with Apple
            </button>
          </div>
        </form>
      </div>

      {/* Right Section - Image Background */}
      <div className="hidden md:flex relative w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${rightImg})` }}>
        <div className="absolute inset-0 bg-black opacity-20"></div>

      </div>
    </div>
  );
};

export default Register;
