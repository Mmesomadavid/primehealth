import React, { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './UI/Table'
import { Button } from './UI/Button'
import { Input } from './UI/Input'
import { Search, SlidersHorizontal, UserPlus, MoreHorizontal, RefreshCcw } from 'lucide-react'
import NewEntityModal from './NewEntityModal'
import searchImg from '../assets/search-icon.png'

interface Patient {
  id: string;
  name: string;
  gender: string;
  doctor: string;
  appointmentStatus: string;
  registrationDate: string;
  
}

interface Hospital {
  id: string;
  name: string;
  location: string;
}

const PatientsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [patients, setPatients] = useState<Patient[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hospitals, setHospitals] = useState<Hospital[]>([])  // Added hospitals state
  const totalPages = 5 // Example total pages

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Simulating fetching patients and hospitals data
  useEffect(() => {
    // Simulating a fetch call for patients
    const fetchedPatients: Patient[] = [
      { id: '1', name: 'John Doe', gender: 'Male', doctor: 'Dr. Smith', appointmentStatus: 'Scheduled', registrationDate: '2024-12-23' },
      { id: '2', name: 'Jane Smith', gender: 'Female', doctor: 'Dr. Adams', appointmentStatus: 'Completed', registrationDate: '2024-11-19' },
      // Add more patients as needed
    ]
    setPatients(fetchedPatients)

    // Simulating a fetch call for hospitals
    const fetchedHospitals: Hospital[] = [
      { id: '1', name: 'City Hospital', location: 'Downtown' },
      { id: '2', name: 'General Medical Center', location: 'Uptown' },
      // Add more hospitals as needed
    ]
    setHospitals(fetchedHospitals)
  }, [])

  const renderTableHeader = () => {
    return (
      <TableRow>
        <TableHead>Patient ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Gender</TableHead>
        <TableHead>Doctor</TableHead>
        <TableHead>Appointment Status</TableHead>
        <TableHead>Registration Date</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    )
  }

  const renderTableContent = () => {
    if (patients.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="h-[400px] text-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src={searchImg}
                alt="No data"
                width={30}
                height={30}
              />
              <p className="mt-4 text-lg font-medium text-gray-500">
                No patients created yet
              </p>
            </div>
          </TableCell>
        </TableRow>
      )
    }

    return patients.map((patient) => (
      <TableRow key={patient.id}>
        <TableCell>{patient.id}</TableCell>
        <TableCell>{patient.name}</TableCell>
        <TableCell>{patient.gender}</TableCell>
        <TableCell>{patient.doctor}</TableCell>
        <TableCell>{patient.appointmentStatus}</TableCell>
        <TableCell>{patient.registrationDate}</TableCell>
        <TableCell>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <div className="w-full space-y-4 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search patients..."
              className="pl-10 w-[300px]"
            />
          </div>
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add patient
          </Button>
        </div>
      </div>

      <div className="rounded-md ">
        <Table>
          <TableHeader className='rounded-md'>
            {renderTableHeader()}
          </TableHeader>
          <TableBody>
            {renderTableContent()}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='bg-gray-300 border-gray-500'
          >
            Previous
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              className='border-gray-400'
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='border-white bg-blue-600 text-white'
          >
            Next
          </Button>
        </div>
      </div>
      
      <NewEntityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hospitals={hospitals}  // Passing hospitals data to modal
      />
    </div>
  )
}

export default PatientsTable
