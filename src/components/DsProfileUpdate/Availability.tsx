'use client';

import React from 'react';
import { Label } from '../UI/Label';
import { Checkbox } from '../UI/Checkbox';
import { Button } from '../UI/Button';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../UI/Input';

// Define the shape of the time slot object
interface TimeSlot {
  startTime: string;
  endTime: string;
}

// Define the shape of the formData prop
interface FormData {
  daysAvailable: string[];
  timeSlots: TimeSlot[];
  consultationTypes: string[];
}

// Define the props for the Availability component
interface AvailabilityProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const consultationTypes = [
  { id: 'physical', label: 'Physical' },
  { id: 'virtual', label: 'Virtual' },
  { id: 'emergency', label: 'Emergency' },
];

const Availability: React.FC<AvailabilityProps> = ({ formData, setFormData }) => {
  const addTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: [...(prev.timeSlots || []), { startTime: '', endTime: '' }],
    }));
  };

  const removeTimeSlot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index),
    }));
  };

  const updateTimeSlot = (index: number, field: 'startTime' | 'endTime', value: string) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Days Available</Label>
        <div className="grid grid-cols-2 gap-4">
          {days.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={day}
                checked={(formData.daysAvailable || []).includes(day)}
                onCheckedChange={(checked) => {
                  const newDays = checked
                    ? [...(formData.daysAvailable || []), day]
                    : (formData.daysAvailable || []).filter((d) => d !== day);
                  setFormData({ ...formData, daysAvailable: newDays });
                }}
              />
              <Label htmlFor={day}>{day}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Time Slots</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTimeSlot}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Time Slot
          </Button>
        </div>

        {formData.timeSlots?.map((slot, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Input
              type="time"
              value={slot.startTime}
              onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
              className="w-32"
            />
            <span>to</span>
            <Input
              type="time"
              value={slot.endTime}
              onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
              className="w-32"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeTimeSlot(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Label>Consultation Types</Label>
        <div className="grid grid-cols-2 gap-4">
          {consultationTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={(formData.consultationTypes || []).includes(type.id)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...(formData.consultationTypes || []), type.id]
                    : (formData.consultationTypes || []).filter((t) => t !== type.id);
                  setFormData({ ...formData, consultationTypes: newTypes });
                }}
              />
              <Label htmlFor={type.id}>{type.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Availability;
