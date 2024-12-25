'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../../components/UI/Avatar"
import { Badge } from "../../components/UI/Badge"
import { Button } from "../../components/UI/Button"
import { Card, CardContent } from "../../components/UI/card"
import { StarIcon, MapPinIcon, PhoneIcon, MailIcon, BuildingIcon, CalendarIcon, DiscIcon as LicenseIcon, Video, MessageSquare } from 'lucide-react'

interface DoctorProfileProps {
  doctor: {
    firstName: string
    lastName: string
    specialization: string
    hospital: string
    experience: number
    email: string
    phone: string
    dateOfBirth: string
    licenseNumber: string
    consultationFee: number
    location: string
    biography: string
    avatar: string
    ratings: number
  }
}

const DoctorProfile = ({ doctor }: DoctorProfileProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-24 w-24 border-2 border-gray-200">
              <AvatarImage src={doctor.avatar} alt={`${doctor.firstName} ${doctor.lastName}`} />
              <AvatarFallback>{doctor.firstName[0]}{doctor.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Dr. {doctor.firstName} {doctor.lastName}</h1>
              <p className="text-gray-600">{doctor.specialization}</p>
              <div className="flex items-center gap-1 mt-1">
                <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{doctor.ratings}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BuildingIcon className="w-4 h-4 text-gray-500" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{doctor.experience} Years Experience</Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-500" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-gray-500" />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-gray-500" />
                <span>{doctor.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <span>DOB: {doctor.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-2">
                <LicenseIcon className="w-4 h-4 text-gray-500" />
                <span>License: {doctor.licenseNumber}</span>
              </div>
              <div className="font-semibold">
                Consultation Fee: ${doctor.consultationFee}/hr
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Biography</h2>
            <p className="text-gray-600">{doctor.biography}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1">
              <Video className="w-4 h-4 mr-2" />
              Virtual Call
            </Button>
            <Button className="flex-1" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Text
            </Button>
            <Button className="flex-1">Book Consultation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DoctorProfile
