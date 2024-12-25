'use client'

import React, { useState } from 'react'
import { Input } from '../UI/Input'
import { Label } from '../UI/Label'
import { Button } from '../UI/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select'
import { Users, UserPlus, Trash2, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'

interface StaffInfoProps {
  formData: any
  setFormData: (data: any) => void
}

const StaffInfo: React.FC<StaffInfoProps> = ({ formData, setFormData }) => {
  const [newStaffMember, setNewStaffMember] = useState({ name: '', position: '', specialization: '' })

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const addStaffMember = () => {
    if (newStaffMember.name && newStaffMember.position) {
      handleChange('staffMembers', [...(formData?.staffMembers || []), newStaffMember])
      setNewStaffMember({ name: '', position: '', specialization: '' })
    }
  }

  const removeStaffMember = (index: number) => {
    const updatedStaffMembers = formData?.staffMembers?.filter((_: any, i: number) => i !== index) || []
    handleChange('staffMembers', updatedStaffMembers)
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Staff Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalDoctors">Total Number of Doctors</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="totalDoctors"
                  type="number"
                  placeholder="Enter total doctors"
                  value={formData?.totalDoctors || ''}
                  onChange={(e) => handleChange('totalDoctors', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalNurses">Total Number of Nurses</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="totalNurses"
                  type="number"
                  placeholder="Enter total nurses"
                  value={formData?.totalNurses || ''}
                  onChange={(e) => handleChange('totalNurses', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffingRatio">Doctor to Patient Ratio</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="staffingRatio"
                placeholder="e.g., 1:10"
                value={formData?.staffingRatio || ''}
                onChange={(e) => handleChange('staffingRatio', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainingPrograms">Training Programs</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 text-gray-400" />
              <textarea
                id="trainingPrograms"
                placeholder="Describe available training programs"
                value={formData?.trainingPrograms || ''}
                onChange={(e) => handleChange('trainingPrograms', e.target.value)}
                className="w-full pl-10 pt-2 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Staff Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData?.staffMembers?.map((staff: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input value={`${staff.name} - ${staff.position}`} disabled />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeStaffMember(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Staff Name"
              value={newStaffMember.name}
              onChange={(e) => setNewStaffMember({ ...newStaffMember, name: e.target.value })}
            />
            <Select
              value={newStaffMember.position}
              onValueChange={(value) => setNewStaffMember({ ...newStaffMember, position: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Specialization (if applicable)"
              value={newStaffMember.specialization}
              onChange={(e) => setNewStaffMember({ ...newStaffMember, specialization: e.target.value })}
            />
          </div>
          <Button onClick={addStaffMember} className="w-full">
            <UserPlus className="h-4 w-4 mr-2" /> Add Staff Member
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default StaffInfo

