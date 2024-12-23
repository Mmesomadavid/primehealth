export interface Education {
    degree: string
    institution: string
    graduationYear: number
  }
  
  export interface Certification {
    certificationName: string
    issuedBy: string
    yearObtained: number
  }
  
  export interface ConsultingHours {
    start: string
    end: string
  }
  
  export interface ConsultationFees {
    initial: number
    followUp: number
  }
  
  export interface DoctorProfile {
    profilePicture: string | null
    specialization: string
    secondarySpecialization?: string
    yearsOfExperience: number
    licenseNumber: string
    licenseAuthority: string
    licenseExpiration: Date
    affiliatedHospitals: string[]
    education: Education[]
    certifications: Certification[]
    biography: string
    languagesSpoken: string[]
    consultingHours: ConsultingHours
    consultationFees: ConsultationFees
    officeAddress: string
    availableServices: string[]
  }
  
  