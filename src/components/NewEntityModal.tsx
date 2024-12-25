'use client'

import { useState } from 'react'
import { Button } from './UI/Button'
import { Input } from './UI/Input'
import { Label } from './UI/Label'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../components/UI/Collapsible'
import { Calendar, ChevronDown, Shield, FileText, Pill, Upload,  User, Mail, Phone } from 'lucide-react'
import { cn } from '../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../components/UI/Avatar'
import { RadioGroup, RadioGroupItem } from '../components/UI/RadioGroup'
import { DatePicker } from '../components/UI/date-picker'

interface NewEntityModalProps {
  isOpen: boolean
  onClose: () => void
}

const NewEntityModal = ({ isOpen, onClose }: NewEntityModalProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: new Date(),
    email: '',
    phone: '',
  })

  const [openSection, setOpenSection] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'primehealth')

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/mmesoma/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        const data = await response.json()
        setProfileImage(data.secure_url)
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        setUploading(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 min-h-screen w-full">
      <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Create New Patient</h2>
            <p className='text-sm text-gray-500 mt-1'>Fill in the credentials of the patient you'd like to initialize</p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage || ''} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className={cn(
                  "absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all",
                  uploading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Upload className="h-4 w-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="pl-10"
                    placeholder="Enter first name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="pl-10"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            <div className="w-full space-y-6">
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <DatePicker
                  date={formData.dateOfBirth}
                  onDateChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="font-medium text-lg">Contact Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Additional Information</h3>
            {[
              { id: 'appointments', icon: Calendar, title: 'Appointments' },
              { id: 'insurance', icon: Shield, title: 'Insurance' },
              { id: 'claims', icon: FileText, title: 'Claims' },
              { id: 'prescriptions', icon: Pill, title: 'Prescriptions' },
            ].map((section) => (
              <Collapsible
                key={section.id}
                open={openSection === section.id}
                onOpenChange={() => setOpenSection(openSection === section.id ? null : section.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <section.icon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-gray-500 transition-transform duration-200",
                    openSection === section.id ? "transform rotate-180" : ""
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 space-y-4 border-x border-b rounded-b-lg">
                  <div className="text-sm text-gray-500">
                    Add {section.title.toLowerCase()} information here
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Patient
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewEntityModal
