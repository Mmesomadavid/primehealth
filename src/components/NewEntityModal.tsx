'use client'

import React, { useState, useCallback } from 'react'
import { X, Upload, User, Building } from 'lucide-react'
import { Button } from './UI/Button'
import { Input } from './UI/Input'
import { Label } from './UI/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./UI/Select"
import { Avatar, AvatarFallback, AvatarImage } from "./UI/Avatar"
import { Card } from './UI/card'

interface Hospital {
  id: string
  name: string
  image?: string
}

interface NewPatientModalProps {
  isOpen: boolean
  onClose: () => void
  hospitals: Hospital[]
}

const NewPatientModal: React.FC<NewPatientModalProps> = ({ 
  isOpen, 
  onClose,
  hospitals = []
}) => {
  const [profileImage, setProfileImage] = useState('')
  const [selectedHospital, setSelectedHospital] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    hospitalId: '',
    email: '',
    phone: '',
    gender: '',
    bloodType: '',
    allergies: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
  })

  const uploadImage = useCallback(async (file: File) => {
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
      console.error('Failed to upload image:', error)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          profileImage,
          allergies: formData.allergies.split(',').map(allergy => allergy.trim()),
          emergencyContact: {
            name: formData.emergencyContactName,
            relationship: formData.emergencyContactRelationship,
            phone: formData.emergencyContactPhone,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create patient')
      }

      onClose()
    } catch (error) {
      console.error('Error creating patient:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto">
      <div className="relative bg-white rounded-lg w-full max-w-2xl my-4 mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Add New Patient</h2>
            <p className="text-sm text-muted-foreground">Enter patient information below</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-8 w-8 border border-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Profile Section */}
              <Card className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <input
                      type="file"
                      id="profilePicture"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                    />
                    <label
                      htmlFor="profilePicture"
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm cursor-pointer border"
                    >
                      <Upload className="h-3 w-3" />
                    </label>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-3">Personal Information</h3>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Select 
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Blood Type</Label>
                      <Select 
                        value={formData.bloodType}
                        onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Medical Information */}
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-3">Medical Information</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input
                      id="allergies"
                      placeholder="Enter allergies (comma-separated)"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Hospital</Label>
                    <Select 
                      value={selectedHospital}
                      onValueChange={(value) => {
                        setSelectedHospital(value)
                        setFormData({ ...formData, hospitalId: value })
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((hospital) => (
                          <SelectItem
                            key={hospital.id}
                            value={hospital.id}
                            className="flex items-center gap-2 p-2"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={hospital.image} alt={hospital.name} />
                                <AvatarFallback>
                                  <Building className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <span>{hospital.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Emergency Contact */}
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-3">Emergency Contact</h3>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="emergencyContactName">Name</Label>
                      <Input
                        id="emergencyContactName"
                        placeholder="Contact name"
                        value={formData.emergencyContactName}
                        onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                      <Input
                        id="emergencyContactRelationship"
                        placeholder="Relationship"
                        value={formData.emergencyContactRelationship}
                        onChange={(e) => setFormData({ ...formData, emergencyContactRelationship: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Phone</Label>
                    <Input
                      id="emergencyContactPhone"
                      type="tel"
                      placeholder="Contact phone"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPatientModal