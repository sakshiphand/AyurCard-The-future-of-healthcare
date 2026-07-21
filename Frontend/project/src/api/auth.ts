import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

export interface RegisterData {
  name: string;
  aadhaar: string; // ✅ changed
  password: string;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
}

export interface LoginData {
  aadhaar: string; // ✅ changed
  password: string;
}

// API Calls

export const registerUser = (data: RegisterData) =>
  axios.post(API_URL + 'register/user', data);

export const registerDoctor = (data: RegisterData) =>
  axios.post(API_URL + 'register/doctor', data);

export const login = (data: LoginData) =>
  axios.post(API_URL + 'login', data);