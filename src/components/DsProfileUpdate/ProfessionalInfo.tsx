'use client'

import React, { useState } from 'react'
import { Input } from '../UI/Input'
import { Label } from '../UI/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select'
import { Textarea } from '../UI/Textarea'
import {  FileText, Calendar, Building, } from 'lucide-react'
import { Slider } from '../UI/Slider'
import { Button } from '../UI/Button'
import { Badge } from '../UI/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import { InputWithIcon } from '../UI/input-with-icon'

interface ProfessionalInfoProps {
  formData: any
  setFormData: (data: any) => void
}

const ProfessionalInfo: React.FC<ProfessionalInfoProps> = ({ formData, setFormData }) => {
  const [newAward, setNewAward] = useState({ name: '', year: '' })

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange('licensePicture', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addAward = () => {
    if (!newAward.name || !newAward.year) return
    handleChange('awardsRecognition', [...(formData.awardsRecognition || []), newAward])
    setNewAward({ name: '', year: '' })
  }

  const addClinicalSkill = (skill: string) => {
    if (!skill.trim()) return
    handleChange('clinicalSkills', [...(formData.clinicalSkills || []), skill])
  }

  const removeClinicalSkill = (skill: string) => {
    handleChange('clinicalSkills', formData.clinicalSkills.filter((s: string) => s !== skill))
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="medicalQualifications">Medical Qualifications</Label>
            <Select
              value={formData.medicalQualifications || ''}
              onValueChange={(value) => handleChange('medicalQualifications', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="md">Doctor of Medicine (MD)</SelectItem>
                <SelectItem value="mbbs">Bachelor of Medicine, Bachelor of Surgery (MBBS)</SelectItem>
                <SelectItem value="do">Doctor of Osteopathic Medicine (DO)</SelectItem>
                <SelectItem value="phd">Doctor of Philosophy (PhD)</SelectItem>
                <SelectItem value="dnp">Doctor of Nursing Practice (DNP)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>License Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputWithIcon
            icon={FileText}
            placeholder="License Number"
            value={formData.licenseNumber || ''}
            onChange={(e) => handleChange('licenseNumber', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Issuing Authority</Label>
              <InputWithIcon
                icon={Building}
                placeholder="Issuing Authority"
                value={formData.issuingAuthority || ''}
                onChange={(e) => handleChange('issuingAuthority', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>License Expiry Date</Label>
              <InputWithIcon
                icon={Calendar}
                type="date"
                value={formData.licenseExpiry || ''}
                onChange={(e) => handleChange('licenseExpiry', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>License Type</Label>
            <Select
              value={formData.licenseType || ''}
              onValueChange={(value) => handleChange('licenseType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select license type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="boardCertified">Board Certified</SelectItem>
                <SelectItem value="specialist">Specialist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>License Picture</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="licensePicture"
            />
            <label
              htmlFor="licensePicture"
              className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:border-primary transition-colors"
            >
              {formData.licensePicture ? (
                <img
                  src={formData.licensePicture}
                  alt="License"
                  className="max-h-full rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <span className="mt-2 block text-sm text-muted-foreground">
                    Click to upload license picture
                  </span>
                </div>
              )}
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience & Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Years of Experience</Label>
            <div className="space-y-2">
              <Slider
                min={0}
                max={50}
                step={1}
                value={[formData.yearsOfExperience || 0]}
                onValueChange={(value) => handleChange('yearsOfExperience', value[0])}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">
                {formData.yearsOfExperience || 0} years
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Clinical Skills & Expertise</Label>
            <div className="flex flex-wrap gap-2">
              {formData.clinicalSkills && formData.clinicalSkills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                  <button 
                    onClick={() => removeClinicalSkill(skill)}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="newSkill"
                placeholder="Add a new skill"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addClinicalSkill((e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ''
                  }
                }}
              />
              <Button 
                onClick={() => {
                  const input = document.getElementById('newSkill') as HTMLInputElement
                  addClinicalSkill(input.value)
                  input.value = ''
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Research & Publications</Label>
            <Textarea
              placeholder="Research contributions and publications"
              value={formData.researchPublications || ''}
              onChange={(e) => handleChange('researchPublications', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Label>Awards & Recognition</Label>
            {formData.awardsRecognition && formData.awardsRecognition.map((award: any, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="font-medium">{award.name}</p>
                  <p className="text-sm text-muted-foreground">Year: {award.year}</p>
                </CardContent>
              </Card>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Award Name"
                value={newAward.name}
                onChange={(e) => setNewAward({...newAward, name: e.target.value})}
              />
              <Input
                placeholder="Year"
                value={newAward.year}
                onChange={(e) => setNewAward({...newAward, year: e.target.value})}
              />
            </div>
            <Button onClick={addAward} className="w-full">
              Add Award
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Languages Spoken</Label>
            <Select
              value={formData.languagesSpoken || ''}
              onValueChange={(value) => handleChange('languagesSpoken', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic', 'Hindi'].map((lang) => (
                  <SelectItem key={lang.toLowerCase()} value={lang.toLowerCase()}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfessionalInfo

