import Header from "../../components/Header";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { FaApple } from "react-icons/fa"; // Import Apple icon
import rightImg from '../../assets/images/onboard1.jpg';
import IconWrapper from "../../components/IconWrapper"; // Import the IconWrapper

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col bg-white p-8 relative">
        {/* Align Header to the top left */}
        <div className="absolute top-0 left-0 p-4">
          <Header />
        </div>

        <form className="w-full max-w-md mt-20 py-10 px-[12px] mx-auto">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
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
                {showPassword ? (
                  <IconWrapper Icon={AiOutlineEyeInvisible} style={{ width: '1.25rem', height: '1.25rem' }} />
                ) : (
                  <IconWrapper Icon={AiOutlineEye} style={{ width: '1.25rem', height: '1.25rem' }} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Re-enter your password"
              required
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4"
          >
            Login to Your Account
          </button>
          <p className="text-gray-400 text-center">don't have an account? <a href="/" className="text-gray-500">register</a></p>
          

          {/* Divider with Social Auth */}
          <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
              <IconWrapper Icon={FcGoogle} style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} /> Log in with Google
            </button>
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
              <IconWrapper Icon={FaApple} style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} /> Log in with Apple
            </button>
          </div>
        </form>
      </div>

      {/* Right Section - Image Background */}
      <div className="hidden md:flex relative w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${rightImg})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;
