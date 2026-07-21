import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import RegisterUser from '../pages/RegisterUser';
import RegisterDoctor from '../pages/RegisterDoctor';
import UserDashboard from '../pages/UserDashboard';
import DoctorDashboard from '../pages/DoctorDashboard';
import AIInsight from '../pages/AIInsight';
import BookAppointment from '../pages/BookAppointment';
import RecordsPage from '../pages/RecordsPage';
import AIInsightDr from '../pages/AIInsightDr';
import AdminComplaintPortal from '../pages/AdminComplaintPortal';

// -------------------- Protected Route --------------------
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({
  children,
  requiredRole
}) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// -------------------- Routes --------------------
export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Register */}
        <Route path="/register/user" element={<RegisterUser />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />

        {/* User Dashboard */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Doctor Dashboard */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* AI Pages */}
        <Route
          path="/ai-insights"
          element={
            <ProtectedRoute>
              <AIInsight />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-insights-dr"
          element={
            <ProtectedRoute>
              <AIInsightDr />
            </ProtectedRoute>
          }
        />

        {/* Appointment */}
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute requiredRole="user">
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        {/* Records */}
        <Route
          path="/records"
          element={
            <ProtectedRoute requiredRole="user">
              <RecordsPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADMIN PORTAL (PUBLIC ACCESS - FIXED) */}
        <Route
          path="/admin/complaints"
          element={<AdminComplaintPortal />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}