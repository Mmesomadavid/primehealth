'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Calendar } from '../../components/UI/Calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../UI/Popover'

interface DatePickerProps {
  date: Date
  onDateChange: (date: Date) => void
}

export function DatePicker({ date, onDateChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && onDateChange(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

