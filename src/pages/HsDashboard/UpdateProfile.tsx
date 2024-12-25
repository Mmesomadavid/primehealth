'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/UI/Button'
import { Progress } from '../../components/Progress'
import HospitalInfo from '../../components/HsProfileUpdate/HospitalInfo'
import FacilitiesInfo from '../../components/HsProfileUpdate/FacilitiesInfo'
import StaffInfo from '../../components/HsProfileUpdate/StaffInfo'
import Logo from '../../assets/primehealth1.svg'
import BgImg from '../../assets/bg-1.jpg'
import { useToast } from '../../hooks/useToast'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface FormData {
  hospitalInfo: any;
  facilitiesInfo: any;
  staffInfo: any;
  servicesInfo: any;
  [key: string]: any;
}

const steps = [
  { id: 1, title: 'Hospital Information', component: HospitalInfo },
  { id: 2, title: 'Facilities Information', component: FacilitiesInfo },
  { id: 3, title: 'Staff Information', component: StaffInfo },
]

const UpdateProfile: React.FC = () => {
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    hospitalInfo: {},
    facilitiesInfo: {},
    staffInfo: {},
    servicesInfo: {},
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()
  const { user, login } = useAuthContext()
  const navigate = useNavigate()

  const progress = (currentStep / steps.length) * 100

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`${url}/api/hospital/profile/${user?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json()

      if (response.ok) {
        if (user?.firstName === "") {
          await login(data)
          navigate("/dashboard/hospital/")
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const getFormDataKey = (stepTitle: string): keyof FormData => {
    return stepTitle.toLowerCase().replace(" ", "") as keyof FormData
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section */}
      <div className="w-full md:w-2/3 flex flex-col">
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
              <Progress value={progress} className="w-[100px]" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-auto px-4 md:px-8 py-6">
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
              <CurrentStepComponent
                formData={formData[getFormDataKey(steps[currentStep - 1].title)]}
                setFormData={(newData: any) => setFormData(prevData => ({
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
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Previous
                </Button>
              )}
            </div>
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : (currentStep === steps.length ? 'Submit' : 'Continue')}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="hidden md:block w-1/3">
        <div className="h-full relative">
          <img
            src={BgImg}
            alt="Hospital Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile

