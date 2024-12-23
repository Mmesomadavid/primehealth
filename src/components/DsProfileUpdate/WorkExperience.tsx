'use client'

import { Input } from '../UI/Input'
import { Label } from '../UI/Label'
import { Button } from '../UI/Button'
import { Plus, Trash2 } from 'lucide-react'
import { Textarea } from '../UI/Textarea'

interface Employer {
  hospitalName: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  keySkills: string[]
}

interface WorkExperienceProps {
  formData: {
    currentPosition: string
    currentHospital: string
    previousEmployers: Employer[]
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ formData, setFormData }) => {
  const addEmployer = () => {
    setFormData((prev: any) => ({
      ...prev,
      previousEmployers: [
        ...(prev.previousEmployers || []),
        {
          hospitalName: '',
          role: '',
          startDate: '',
          endDate: '',
          current: false,
          keySkills: []
        }
      ]
    }))
  }

  const removeEmployer = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      previousEmployers: prev.previousEmployers.filter((_: any, i: number) => i !== index)
    }))
  }

  const updateEmployer = (index: number, field: keyof Employer, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      previousEmployers: prev.previousEmployers.map((emp: Employer, i: number) => 
        i === index ? { ...emp, [field]: value } : emp
      )
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currentPosition">Current Position/Role</Label>
        <Input
          id="currentPosition"
          placeholder="Enter your current position"
          value={formData.currentPosition || ''}
          onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentHospital">Current Hospital/Clinic</Label>
        <Input
          id="currentHospital"
          placeholder="Enter your current workplace"
          value={formData.currentHospital || ''}
          onChange={(e) => setFormData({ ...formData, currentHospital: e.target.value })}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Previous Employment History</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEmployer}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Previous Employer
          </Button>
        </div>

        {formData.previousEmployers?.map((employer: Employer, index: number) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium">Previous Employer {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEmployer(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hospital/Clinic Name</Label>
                <Input
                  value={employer.hospitalName}
                  onChange={(e) => updateEmployer(index, 'hospitalName', e.target.value)}
                  placeholder="Enter hospital name"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={employer.role}
                  onChange={(e) => updateEmployer(index, 'role', e.target.value)}
                  placeholder="Enter your role"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={employer.startDate}
                  onChange={(e) => updateEmployer(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={employer.endDate}
                  onChange={(e) => updateEmployer(index, 'endDate', e.target.value)}
                  disabled={employer.current}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Key Skills/Procedures</Label>
              <Textarea
                value={employer.keySkills.join(', ')}
                onChange={(e) => updateEmployer(index, 'keySkills', e.target.value.split(',').map((s: string) => s.trim()))}
                placeholder="Enter key skills or procedures (comma-separated)"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkExperience
