import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Brain, 
  Settings,
  Activity
} from 'lucide-react';
import { getUserRole } from '../utils/authHeader';

export default function Sidebar() {
  const location = useLocation();
  const userRole = getUserRole();

  const userMenuItems = [
    { path: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/book-appointment', label: 'Book Appointment', icon: Calendar },
    { path: '/ai-insights', label: 'AI Insights', icon: Brain },
    { path: '/medical-records', label: 'Medical Records', icon: FileText },
  ];

  const doctorMenuItems = [
    { path: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/patients', label: 'Patients', icon: Users },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
 // { path: '/ai-insights', label: 'AI Insights', icon: Brain },
    { path: '/analytics', label: 'Analytics', icon: Activity },
  ];

  const menuItems = userRole === 'doctor' ? doctorMenuItems : userMenuItems;

  return (
    <div className="bg-white shadow-lg h-screen w-64 fixed left-0 top-16 border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-6 mt-6 border-t border-gray-200">
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}