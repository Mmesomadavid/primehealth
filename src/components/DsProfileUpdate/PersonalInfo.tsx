'use client'

import React from 'react'
import { Input } from '../UI/Input'
import { Label } from '../UI/Label'
import { Textarea } from '../UI/Textarea'
import { User, Calendar, Users, MapPin, Home, Building, Hash, Camera, AlignLeft } from 'lucide-react'


interface PersonalInfoProps {
  formData: any
  setFormData: (data: any) => void
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange('profilePicture', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
            {formData.profilePicture ? (
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          <label htmlFor="profilePictureInput" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <Camera className="w-6 h-6 text-gray-600" />
          </label>
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="username"
            placeholder="Enter your username"
            value={formData.username || ''}
            onChange={(e) => handleChange('username', e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="biography">Biography</Label>
        <div className="relative">
          <AlignLeft className="absolute left-3 top-3 text-black" />
          <Textarea
            id="biography"
            placeholder="Tell us about yourself"
            value={formData.biography || ''}
            onChange={(e) => handleChange('biography', e.target.value)}
            rows={4}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" />
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
            id="gender"
            value={formData.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="pl-10 border rounded-md h-11 w-full"
            required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>


      <div className="space-y-2">
        <Label htmlFor="streetAddress">Street Address</Label>
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <Input
            id="streetAddress"
            placeholder="Enter your street address"
            value={formData.streetAddress || ''}
            onChange={(e) => handleChange('streetAddress', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <Input
              id="state"
              placeholder="Enter your state"
              value={formData.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">Zip Code</Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <Input
            id="zipCode"
            placeholder="Enter your zip code"
            value={formData.zipCode || ''}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo

