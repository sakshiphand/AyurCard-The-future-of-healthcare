// Mock API functions for user data

export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  aadhaar: string; // ✅ changed
}

export interface MedicalRecord {
  _id: string;
  symptoms: string;
  description?: string;
  severity?: string;
  urgency?: string;
  preferredSpecialization?: string;
  appointmentType?: string;
  notes?: string;
  status: string;
  diagnosis?: string;
  treatment?: string;
  doctor?: Doctor;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  aadhaar: string; // ✅ changed
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
}

export interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  time: string;
  appointmentType: string;
  reason: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  createdAt: string;
  updatedAt?: string;
}

// ✅ Mock Profile
const mockProfile: UserProfile = {
  _id: '1',
  name: 'John Doe',
  aadhaar: '123412341234', // ✅ added
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  address: '123 Main St, City, State 12345'
};

// ✅ Medical Records
let mockRecords: MedicalRecord[] = [
  {
    _id: '1',
    symptoms: 'Headache, dizziness',
    description: 'Persistent headaches for a week',
    severity: 'moderate',
    status: 'completed',
    diagnosis: 'Tension headache',
    treatment: 'Rest, hydration',
    doctor: {
      _id: 'doc1',
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      aadhaar: '567856785678' // ✅ changed
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z'
  },
  {
    _id: '2',
    symptoms: 'Chest pain',
    description: 'Mild chest discomfort',
    severity: 'moderate',
    status: 'in-progress',
    doctor: {
      _id: 'doc2',
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      aadhaar: '111122223333'
    },
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    _id: '3',
    symptoms: 'Lower back pain',
    severity: 'mild',
    status: 'pending',
    createdAt: '2024-01-22T16:45:00Z'
  },{

  
  _id: '4',
    symptoms: 'Headache, dizziness',
    description: 'Persistent headaches for a week',
    severity: 'moderate',
    status: 'completed',
    diagnosis: 'Tension headache',
    treatment: 'Rest, hydration',
    doctor: {
      _id: 'doc1',
      name: 'Dr.John',
      specialization: 'General Medicine',
      aadhaar: '567856785678' // ✅ changed
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z'
  },
];

// ✅ Appointments
let mockAppointments: Appointment[] = [
  {
    _id: '1',
    doctorId: 'doc1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialization: 'General Medicine',
    date: '2024-01-25',
    time: '10:30',
    appointmentType: 'consultation',
    reason: 'Regular checkup',
    status: 'scheduled',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    _id: '2',
    doctorId: 'doc2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialization: 'Cardiology',
    date: '2024-01-18',
    time: '14:00',
    appointmentType: 'follow-up',
    reason: 'Chest pain review',
    status: 'completed',
    createdAt: '2024-01-15T14:30:00Z'
  }
];

// API functions

export const getUserProfile = async (): Promise<{ data: UserProfile }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: mockProfile };
};

export const getRecords = async (): Promise<{ data: MedicalRecord[] }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: mockRecords };
};

export const addRecord = async (recordData: Partial<MedicalRecord>): Promise<{ data: MedicalRecord }> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const newRecord: MedicalRecord = {
    _id: Date.now().toString(),
    symptoms: recordData.symptoms || '',
    description: recordData.description,
    severity: recordData.severity,
    urgency: recordData.urgency,
    preferredSpecialization: recordData.preferredSpecialization,
    appointmentType: recordData.appointmentType,
    notes: recordData.notes,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  mockRecords.unshift(newRecord);
  return { data: newRecord };
};

export const updateRecord = async (
  recordId: string,
  updates: Partial<MedicalRecord>
): Promise<{ data: MedicalRecord }> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  const index = mockRecords.findIndex(r => r._id === recordId);
  if (index === -1) throw new Error('Record not found');

  mockRecords[index] = {
    ...mockRecords[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  return { data: mockRecords[index] };
};

export const getAppointments = async (): Promise<{ data: Appointment[] }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: mockAppointments };
};

export const addAppointment = async (
  appointmentData: Partial<Appointment>
): Promise<{ data: Appointment }> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const newAppointment: Appointment = {
    _id: Date.now().toString(),
    doctorId: appointmentData.doctorId || '',
    doctorName: appointmentData.doctorName || '',
    doctorSpecialization: appointmentData.doctorSpecialization || '',
    date: appointmentData.date || '',
    time: appointmentData.time || '',
    appointmentType: appointmentData.appointmentType || 'consultation',
    reason: appointmentData.reason || '',
    notes: appointmentData.notes,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  };

  mockAppointments.unshift(newAppointment);
  return { data: newAppointment };
};