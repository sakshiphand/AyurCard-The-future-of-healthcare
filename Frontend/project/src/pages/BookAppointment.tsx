import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Check } from 'lucide-react';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  aadhaar: string;
  rating: number;
  experience: number;
  location: string;
  availableSlots: string[];
}

interface Appointment {
  _id: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  aadhaar: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
}

// Mock doctors list
const mockDoctors: Doctor[] = [
  {
    _id: 'doc1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Medicine',
    aadhaar: '123412341234',
    rating: 4.8,
    experience: 12,
    location: 'Main Hospital, Floor 2',
    availableSlots: ['09:00', '10:30', '14:00', '15:30']
  },
  
  {
    _id: 'doc2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    aadhaar: '567856785678',
    rating: 4.9,
    experience: 15,
    location: 'Cardiology Wing, Floor 3',
    availableSlots: ['08:30', '11:00', '13:30', '16:00']
  },
   {
    _id: 'doc2',
    name: 'Dr.John',
    specialization: 'Cardiology',
    aadhaar: '567856785678',
    rating: 4.9,
    experience: 15,
    location: 'Cardiology Wing, Floor 3',
    availableSlots: ['08:30', '11:00', '13:30', '16:00']
  }
];

// API functions
const bookAppointment = (data: any) => axios.post("http://localhost:5000/api/appointments/book", data);
const getAppointments = () => axios.get("http://localhost:5000/api/appointments");

export default function BookAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [manualDoctorName, setManualDoctorName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [search, setSearch] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Tomorrow date for min date
  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  // Filtered doctor list based on search
  const filteredDoctors = mockDoctors.filter(
    d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const isValidAadhaar = (num: string) => /^[0-9]{12}$/.test(num);

  // Fetch appointments on load
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !(selectedDoctor || manualDoctorName) ||
      !selectedDate ||
      !selectedTime ||
      !reason.trim() ||
      !patientName ||
      !age ||
      !gender ||
      !phone ||
      !aadhaar
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (!isValidAadhaar(aadhaar)) {
      alert('Enter valid 12-digit Aadhaar number');
      return;
    }

    try {
      const res = await bookAppointment({
        patientName,
        age,
        gender,
        phone,
        aadhaar,
        doctorId: selectedDoctor?._id || '',
        doctorName: selectedDoctor?.name || manualDoctorName,
        date: selectedDate,
        time: selectedTime,
        reason
      });

      setBookingSuccess(true);
      setAppointments(prev => [res.data.appointment, ...prev]);

      setTimeout(() => {
        setSelectedDoctor(null);
        setManualDoctorName('');
        setSelectedDate('');
        setSelectedTime('');
        setReason('');
        setPatientName('');
        setAge('');
        setGender('');
        setPhone('');
        setAadhaar('');
        setBookingSuccess(false);
      }, 2500);

    } catch (err: any) {
      alert(err.response?.data?.msg || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            Book Your Appointment
          </h1>
        </div>

        {/* Doctor selection / manual entry */}
        {!selectedDoctor ? (
          <>
            <input
              type="text"
              placeholder="Search doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc._id}
                  onClick={() => setSelectedDoctor(doc)}
                  className="bg-white p-5 rounded-xl shadow cursor-pointer"
                >
                  <h3 className="font-bold">{doc.name}</h3>
                  <p className="text-sm text-blue-600">{doc.specialization}</p>
                </div>
              ))}
            </div>

            {/* Manual doctor entry */}
            <input
              type="text"
              placeholder="Enter doctor name if not in list"
              value={manualDoctorName}
              onChange={(e) => setManualDoctorName(e.target.value)}
              className="w-full border p-3 rounded mb-6"
            />
          </>
        ) : bookingSuccess ? (
          <div className="text-center p-10 bg-white rounded-xl shadow">
            <Check className="mx-auto text-green-600 w-10 h-10" />
            <h2 className="text-xl font-bold mt-3">Booked Successfully</h2>
          </div>
        ) : null}

        {/* Booking form */}
        {(!bookingSuccess && (selectedDoctor || manualDoctorName)) && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="font-bold text-lg">{selectedDoctor ? selectedDoctor.name : manualDoctorName}</h2>

            <input type="text" placeholder="Full Name"
              value={patientName} onChange={(e) => setPatientName(e.target.value)}
              className="w-full border p-3 rounded" required />

            <input type="number" placeholder="Age"
              value={age} onChange={(e) => setAge(e.target.value)}
              className="w-full border p-3 rounded" required />

            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="w-full border p-3 rounded" required>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input type="tel" placeholder="Phone"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded" required />

            <input type="text" placeholder="Aadhaar"
              value={aadhaar} onChange={(e) => setAadhaar(e.target.value)}
              maxLength={12} className="w-full border p-3 rounded" required />

            <input type="date" min={tomorrow()}
              value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border p-3 rounded" required />

            <select value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border p-3 rounded" required>
              <option value="">Select Time</option>
              {(selectedDoctor ? selectedDoctor.availableSlots : ['09:00','10:00','11:00']).map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <textarea placeholder="Reason"
              value={reason} onChange={(e) => setReason(e.target.value)}
              className="w-full border p-3 rounded" required />

            <button className="w-full bg-blue-600 text-white p-3 rounded">
              Confirm Appointment
            </button>
          </form>
        )}

        {/* Appointment list */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments booked yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map(app => (
                <div key={app._id} className="bg-white p-4 rounded-xl shadow">
                  <h3 className="font-bold">{app.doctorName}</h3>
                  <p>{app.date} at {app.time}</p>
                  <p>Patient: {app.patientName} ({app.age} y/o, {app.gender})</p>
                  <p>Reason: {app.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}