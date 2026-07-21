import axios from 'axios';
import { authHeader } from '../utils/authHeader';

const API_URL = 'http://localhost:5000/api/doctor/';

export interface DoctorProfile {
  _id: string;
  name: string;
  aadhaar: string; // ✅ changed
  phone: string;
  specialization: string;
  licenseNumber: string;
  experience?: number;
  education?: string;
}

export interface Patient {
  _id: string;
  name: string;
  aadhaar: string; // ✅ changed
  phone: string;
  dateOfBirth?: string;
  bloodType?: string;
  lastVisit?: string;
  records: any[];
}

// API Calls

export const getDoctorProfile = () =>
  axios.get<DoctorProfile>(API_URL + 'profile', {
    headers: authHeader()
  });

export const getPatients = () =>
  axios.get<Patient[]>(API_URL + 'patients', {
    headers: authHeader()
  });

export const updateRecord = (id: string, data: any) =>
  axios.put(API_URL + `update-record/${id}`, data, {
    headers: authHeader()
  });

export const getAppointments = () =>
  axios.get(API_URL + 'appointments', {
    headers: authHeader()
  });