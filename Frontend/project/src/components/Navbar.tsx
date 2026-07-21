import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, LogOut, Bell, Menu, X } from 'lucide-react';
import axios from 'axios';
import { logout, getUserRole, getUserName } from '../utils/authHeader';
import { useNotification } from '../components/Notification';

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const userRole = getUserRole();
  const { notify } = useNotification();

  useEffect(() => {
    const name = getUserName();
    setUserName(name);
  }, []);

  const handleLogout = () => {
    logout();
    setUserName('');
  };

  const handleBellClick = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/appointments");

    const doctorAppointments = res.data.filter(
      (app: any) =>
        app.doctorName?.toLowerCase().trim() ===
        userName?.toLowerCase().trim()
    );

    if (doctorAppointments.length > 0) {

      // latest appointment
      const latest = doctorAppointments[0];

      notify(
        "success",
        "New Appointment Booked",
        `Patient: ${latest.patientName} | ${latest.date} at ${latest.time}`
      );

    } else {
      notify(
        "info",
        "No Appointments",
        "No bookings assigned to you"
      );
    }

  } catch (err) {
    console.error(err);
    notify("error", "Error", "Failed to fetch appointments");
  }
};

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">AyurCard</span>
              <span className="text-xs text-gray-500">Healthcare Management System</span>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-6">

            {/* USER NAV */}
            {userRole === 'user' && (
              <>
                <Link to="/user/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <Link to="/book-appointment" className="text-gray-700 hover:text-blue-600">Book Appointment</Link>
                <Link to="/ai-insights" className="text-gray-700 hover:text-blue-600">AI Insights</Link>
              </>
            )}

            {/* DOCTOR NAV */}
            {userRole === 'doctor' && (
              <>
                <Link to="/doctor/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <Link to="/ai-insights-dr" className="text-gray-700 hover:text-blue-600">AI Insights</Link>
              </>
            )}

            {/* 🔔 Bell ONLY for doctor */}
            {userRole === 'doctor' && (
              <button
                onClick={handleBellClick}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">
                    {userName || 'User'}
                  </div>
                  <div className="text-gray-500 capitalize">
                    {userRole}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 p-2"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}