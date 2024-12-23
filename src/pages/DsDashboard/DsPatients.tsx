import React, { useState, useEffect } from 'react';
import PatientsTable from '../../components/PatientsTable';  // Import PatientsTable
import { useToast } from '../../hooks/useToast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

// Define the Patient interface
interface Patient {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastActive: string;
  dateAdded: string;
}

const DoctorPatients: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast, Toast } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  // Function to fetch patients
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Patient[]>('/api/patients');
      (response.data);  // Store the fetched data in state
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to fetch patients. Please try again later.');
      showToast({ message: 'Failed to fetch patients', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button onClick={fetchPatients} className="mt-4 text-blue-500 underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Pass the patients data to the PatientsTable component */}
      <PatientsTable />
      <Toast />
    </div>
  );
};

export default DoctorPatients;
