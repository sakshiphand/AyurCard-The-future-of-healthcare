import React, { useEffect, useState } from 'react';
import { getDoctorProfile, DoctorProfile, Patient } from '../api/doctor';
import Navbar from '../components/Navbar';
import Card, { StatsCard } from '../components/Card';
import { Users, Calendar, Activity, Clock, User, Eye, Trash2, CreditCard as Edit } from 'lucide-react';
import dummyPatientsData from '../data/dummyPatients.json';

interface ExtendedPatient extends Patient {
  ayurCardId?: string;
  aadhaar?: string;
  symptoms?: string;
  disease?: string;
  treatment?: string;
  status?: string;
  fees?: number;
}

export default function DoctorDashboard() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [patients, setPatients] = useState<ExtendedPatient[]>([]);
  const [loading, setLoading] = useState(true);

  const getRandomPatients = (data: ExtendedPatient[], count: number = 15) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getDoctorProfile();
        setProfile(profileRes.data);

        const randomizedPatients = getRandomPatients(dummyPatientsData as ExtendedPatient[]);
        setPatients(randomizedPatients);
      } catch (error) {
        console.error('Error:', error);

        const fallback = getRandomPatients(dummyPatientsData as ExtendedPatient[]);
        setPatients(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'ongoing' || p.status === 'pending').length;

  const recentPatients = patients.filter(p => {
    if (!p.lastVisit) return false;
    const lastVisit = new Date(p.lastVisit);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return lastVisit >= weekAgo;
  }).length;

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      ongoing: 'bg-blue-100 text-blue-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar profile={profile || undefined} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome {profile?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            {profile?.specialization} • License: {profile?.licenseNumber}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Patients" value={totalPatients} icon={Users} />
          <StatsCard title="Active Patients" value={activePatients} icon={Activity} />
          <StatsCard title="This Week" value={recentPatients} icon={Calendar} />
          <StatsCard
            title="Pending Reviews"
            value={patients.filter(p => p.status === 'pending').length}
            icon={Clock}
          />
        </div>

        {/* Patients Table */}
        <Card title="Recent Patients" icon={Users}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Aadhaar</th>
                  <th>Name</th>
                  <th>Symptoms</th>
                  <th>Disease</th>
                  <th>Status</th>
                  <th>Fees</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {patients.slice(0, 10).map(p => (
                  <tr key={p._id} className="border-b hover:bg-gray-50 transition">

                    <td className="text-blue-600 font-medium py-2">
                      {p.aadhaar || 'N/A'}
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {p.name}
                      </div>
                    </td>

                    <td>{p.symptoms}</td>
                    <td>{p.disease}</td>

                    <td>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(p.status || 'pending')}`}>
                        {p.status}
                      </span>
                    </td>

                    <td className="font-semibold text-gray-700">
                      ₹{p.fees}
                    </td>

                    <td className="flex gap-3 text-gray-600">
                      <Eye size={16} className="cursor-pointer hover:text-blue-600" />
                      <Edit size={16} className="cursor-pointer hover:text-green-600" />
                      <Trash2 size={16} className="cursor-pointer hover:text-red-600" />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Profile Section */}
        <div className="mt-8">
          <Card title="Doctor Profile">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-500">Specialization</p>
                <p className="font-semibold">{profile?.specialization}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-500">License</p>
                <p className="font-semibold">{profile?.licenseNumber}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-500">Aadhaar</p>
                <p className="font-semibold">{profile?.aadhaar}</p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}