import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useToast } from '../../hooks/useToast'
import { Button } from '../../components/UI/Button'
import { Progress } from '../../components/Progress'
import PersonalInfo from '../../components/DsProfileUpdate/PersonalInfo'
import ProfessionalInfo from '../../components/DsProfileUpdate/ProfessionalInfo'
import WorkExperience from '../../components/DsProfileUpdate/WorkExperience'
import Availability from '../../components/DsProfileUpdate/Availability'
import Logo from '../../assets/primehealth1.svg'
import BgImg from '../../assets/bg-1.jpg'

// Define the type for the formData
interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  professionalInfo: {
    specialty: string;
    qualifications: string;
  };
  workExperience: {
    currentPosition: string;
    currentHospital: string;
    previousEmployers: { name: string; role: string }[];
  };
  availability: {
    daysAvailable: string[];
    hoursAvailable: string;
  };
  [key: string]: any; // Added index signature to allow dynamic keys
}

const steps = [
  { id: 1, title: 'Personal Information', component: PersonalInfo },
  { id: 2, title: 'Professional Information', component: ProfessionalInfo },
  { id: 3, title: 'Work Experience', component: WorkExperience },
  { id: 5, title: 'Availability', component: Availability },
]

const UpdateProfile: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: { firstName: '', lastName: '', email: '' },
    professionalInfo: { specialty: '', qualifications: '' },
    workExperience: { currentPosition: '', currentHospital: '', previousEmployers: [] },
    availability: { daysAvailable: [], hoursAvailable: '' },
  })
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL
  const navigate = useNavigate()
  const { user, login } = useAuthContext()
  const { showToast, Toast } = useToast()

  const progress = (currentStep / steps.length) * 100

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      try {
        const res = await fetch(`${url}/api/doctor/profile/${user?._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await res.json()

        if (res.ok) {
          if (user?.firstName === "") {
            await login(data)
            navigate("/dashboard/doctor/")
          } else {
            showToast({
              message: data.message,
              type: "success",
            })
          }
        } else {
          throw new Error(data.message)
        }
      } catch (error) {
        showToast({
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          type: "error",
        })
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  // Helper function to map step title to formData key
  const getFormDataKey = (stepTitle: string): keyof FormData => {
    return stepTitle.toLowerCase().replace(" ", "") as keyof FormData
  }

  // Dynamically select the component based on the current step
  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="h-screen bg-white flex">
      {/* Left Section */}
      <div className="w-full md:w-2/2 flex flex-col">
        {/* Header with Logo and Progress */}
        <div className="bg-white border-b z-10">
          <div className="px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
              <img
                src={Logo}
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                draggable={false}
              />
              <Progress value={progress} size={40} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-hidden px-4 md:px-8 py-6 custom-scrollbar">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {steps[currentStep - 1].title}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </p>
            </div>

            <div className="space-y-6">
              {/* Dynamically passing the correct formData based on current step */}
              <CurrentStepComponent
                formData={formData[getFormDataKey(steps[currentStep - 1].title)]}
                setFormData={(newData: any) => setFormData((prevData: any) => ({
                  ...prevData,
                  [getFormDataKey(steps[currentStep - 1].title)]: newData,
                }))}
              />
            </div>
          </motion.div>
        </div>

        {/* Footer with Buttons */}
        <div className="bg-white border-t px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              {currentStep < steps.length && (
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Skip for now
                </button>
              )}
            </div>
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="border-[#E5E7EB] text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="bg-[#2558ff] hover:bg-[#4134cc] text-white px-8"
              >
                {currentStep === steps.length ? 'Submit' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="hidden md:block w-2/2">
        <div className="h-full relative">
          <img
            src={BgImg}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </div>
      <Toast />
    </div>
  )
}

export default UpdateProfile
