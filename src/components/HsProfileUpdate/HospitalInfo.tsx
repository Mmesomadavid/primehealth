'use client'

import React from 'react'
import { Input } from '../UI/Input'
import { Label } from '../UI/Label'
import { Textarea } from '../UI/Textarea'
import { Building, MapPin, Phone, Mail, Globe, Camera } from 'lucide-react'

interface HospitalInfoProps {
  formData: Record<string, any>
  setFormData: (data: Record<string, any>) => void
}

const HospitalInfo: React.FC<HospitalInfoProps> = ({ formData = {}, setFormData }) => {
  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'primehealth')

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/mmesoma/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const data = await response.json()
        handleChange('hospitalLogo', data.secure_url)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="hospitalLogo">Hospital Logo</Label>
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
            {formData.hospitalLogo ? (
              <img
                src={formData.hospitalLogo}
                alt="Hospital Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          <label htmlFor="hospitalLogoInput" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <Camera className="w-6 h-6 text-gray-600" />
          </label>
          <input
            id="hospitalLogoInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospitalName">Hospital Name</Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="hospitalName"
            placeholder="Enter hospital name"
            value={formData.hospitalName || ''}
            onChange={(e) => handleChange('hospitalName', e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Hospital Description</Label>
        <div className="relative">
          <Textarea
            id="description"
            placeholder="Brief description of the hospital"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="pl-10 pt-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" />
          <Textarea
            id="address"
            placeholder="Enter hospital address"
            value={formData.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            className="pl-10 pt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="website"
            type="url"
            placeholder="Enter hospital website"
            value={formData.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}

export default HospitalInfo

