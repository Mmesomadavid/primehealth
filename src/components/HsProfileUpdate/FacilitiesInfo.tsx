'use client'

import React, { useState } from 'react'
import { Input } from '../UI/Input'
import { Label } from '../UI/Label'
import { Textarea } from '../UI/Textarea'
import { Button } from '../UI/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select'
import { Bed, Stethoscope, Microscope, Syringe, Thermometer, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import { Badge } from '../UI/Badge'

interface FacilitiesInfoProps {
  formData: any
  setFormData: (data: any) => void
}

const FacilitiesInfo: React.FC<FacilitiesInfoProps> = ({ formData = {}, setFormData }) => {
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' })

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const addDepartment = () => {
    if (newDepartment.name && newDepartment.description) {
      handleChange('departments', [...(formData.departments || []), newDepartment])
      setNewDepartment({ name: '', description: '' })
    }
  }

  const removeDepartment = (index: number) => {
    const updatedDepartments = (formData.departments || []).filter((_: any, i: number) => i !== index)
    handleChange('departments', updatedDepartments)
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>General Facilities Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalBeds">Total Number of Beds</Label>
              <div className="relative">
                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="totalBeds"
                  type="number"
                  placeholder="Enter total beds"
                  value={formData.totalBeds || ''}
                  onChange={(e) => handleChange('totalBeds', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icuBeds">ICU Beds</Label>
              <div className="relative">
                <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="icuBeds"
                  type="number"
                  placeholder="Enter ICU beds"
                  value={formData.icuBeds || ''}
                  onChange={(e) => handleChange('icuBeds', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operatingRooms">Number of Operating Rooms</Label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="operatingRooms"
                type="number"
                placeholder="Enter number of operating rooms"
                value={formData.operatingRooms || ''}
                onChange={(e) => handleChange('operatingRooms', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyServices">Emergency Services</Label>
            <Select
              value={formData.emergencyServices || ''}
              onValueChange={(value) => handleChange('emergencyServices', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select emergency service availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24/7">24/7 Emergency Services</SelectItem>
                <SelectItem value="limited">Limited Emergency Services</SelectItem>
                <SelectItem value="none">No Emergency Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specialized Facilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Available Specialized Facilities</Label>
            <div className="flex flex-wrap gap-2">
              {['MRI', 'CT Scan', 'X-Ray', 'Ultrasound', 'Catheterization Lab', 'Dialysis Unit'].map((facility) => (
                <Badge
                  key={facility}
                  variant={(formData.specializedFacilities || []).includes(facility) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    const updatedFacilities = (formData.specializedFacilities || []).includes(facility)
                      ? (formData.specializedFacilities || []).filter((f: string) => f !== facility)
                      : [...(formData.specializedFacilities || []), facility]
                    handleChange('specializedFacilities', updatedFacilities)
                  }}
                >
                  {facility}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="laboratoryServices">Laboratory Services</Label>
            <div className="relative">
              <Microscope className="absolute left-3 top-3 text-gray-400" />
              <Textarea
                id="laboratoryServices"
                placeholder="Describe available laboratory services"
                value={formData.laboratoryServices || ''}
                onChange={(e) => handleChange('laboratoryServices', e.target.value)}
                className="pl-10 pt-2"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pharmacyServices">Pharmacy Services</Label>
            <div className="relative">
              <Syringe className="absolute left-3 top-3 text-gray-400" />
              <Textarea
                id="pharmacyServices"
                placeholder="Describe pharmacy services"
                value={formData.pharmacyServices || ''}
                onChange={(e) => handleChange('pharmacyServices', e.target.value)}
                className="pl-10 pt-2"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(formData.departments || []).map((dept: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input value={dept.name} disabled />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeDepartment(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Department Name"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
            />
            <Input
              placeholder="Brief Description"
              value={newDepartment.description}
              onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
            />
          </div>
          <Button onClick={addDepartment} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Department
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FacilitiesInfo

