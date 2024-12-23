'use client'

import DoctorProfile from "./DsProfile"

const mockDoctorData = {
  firstName: "John",
  lastName: "Doe",
  specialization: "Cardiologist",
  hospital: "City General Hospital",
  experience: 15,
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1980-05-15",
  licenseNumber: "MED123456",
  consultationFee: 150,
  location: "New York, NY",
  biography: "Dr. John Doe is a board-certified cardiologist with over 15 years of experience. He specializes in interventional cardiology and has performed numerous complex cardiac procedures.",
  avatar: "/placeholder.svg?height=128&width=128",
  ratings: 4.8
}

const DoctorProfilePage = () => {
  return <DoctorProfile doctor={mockDoctorData} />
}

export default DoctorProfilePage

