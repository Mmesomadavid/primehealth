import Header from "../../components/Header";
import { useState, ChangeEvent, FormEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { ArrowUpLeft } from "lucide-react";
import rightImg from '../../assets/images/onboard2.jpg';
import IconWrapper from "../../components/IconWrapper";
import { Link } from 'react-router-dom';
import Alert from "../../components/UI/Alert";
import Btn from "../../components/UI/Btn";
import { contextData } from "../../context/AuthContext";
import OtpModal from "../../components/otpModal"; // Ensure the correct path to your OtpModal

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const { user } = contextData();

  const validateForm = (): string => {
    if (accountType === "") return "Please select a user type";
    if (email.length < 5 || !email.includes("@")) return "Please enter a valid email address";
    if (firstName.length < 3) return "Your first name must be at least 3 characters";
    if (lastName.length < 3) return "Your last name must be at least 3 characters";
    if (password.length < 5) return "Your password must be at least 5 characters";
    if (!passwordsMatch) return "Passwords do not match";
    if (!termsAccepted) return "You must accept the terms and conditions";
    return "success";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setError(null);
    const { id, value } = e.target;

    switch (id) {
      case "accountType":
        setAccountType(value);
        break;
      case "email":
        setEmail(value.toLowerCase());
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirm-password":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationResult = validateForm();
    if (validationResult !== "success") {
      setError(validationResult);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          accountType,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "An error occurred during registration");
      } else {
        const successData = await res.json();
        setSuccess(successData.message || "Registration successful!");
        setShowPopup(true); // Show the popup
      }
    } catch (err) {
      setError("Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    !user && (
      <div className="flex min-h-screen relative">
        {/* Left Section - Form */}
        <div className={`w-full md:w-1/2 flex flex-col bg-white p-8 relative z-20`}>
          <div className="absolute top-0 left-0 p-4">
            <Header />
          </div>
          <form className="w-full max-w-md mt-20 mx-auto" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div className="mb-4">
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                I am a:
              </label>
              <select
                id="accountType"
                value={accountType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="" disabled>Select your role</option>
                <option value="healthOrg">Health Organisation</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            {/* First Name and Last Name Inputs */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password and Confirm Password Inputs */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the <Link to="/terms" className="text-blue-500 underline">terms and conditions</Link>.
              </label>
            </div>

            {/* Error and Success Messages */}
            {error && <Alert type="danger" message={error as string} />}
            {success && <p className="text-green-500">{success as string}</p>}
  
            {/* Submit Button */}
            <Btn
              type="big"
              label="Create account"
              color="blue"
              disabled={loading}
              form
            />
  
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
  
            {/* Navigation Links */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
            </p>
          </form>
        </div>
        
        {/* Right Section - Image Background */}
        <div className="hidden md:flex relative w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${rightImg})` }}>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          {/* Button at the top right */}
          <button className="absolute top-4 right-4 flex items-center justify-center bg-white text-black text-sm px-3 py-2 rounded shadow-md hover:bg-gray-100 transition duration-300">
              <ArrowUpLeft className="mr-1" size={16} /> {/* Adjust size as needed */}
                  Explore
          </button>
        </div>

        {/* Otp Popup */}
        {showPopup && <OtpModal onClose={() => setShowPopup(false)} />}
      </div>
    )
  );
};

export default Register;
