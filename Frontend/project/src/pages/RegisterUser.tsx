import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { registerUser } from '../api/auth';

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Aadhaar validation
    if (!/^\d{12}$/.test(formData.aadhaar)) {
      setError('Aadhaar must be exactly 12 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerUser({
        name: formData.name,
        aadhaar: formData.aadhaar,
        password: formData.password,
        phone: formData.phone
      });

      navigate('/', {
        state: { message: 'Registration successful! Please sign in.' }
      });
    } catch (error: any) {
      setError(
        error.response?.data?.msg ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="flex min-h-screen">

        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 to-blue-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center max-w-lg">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
              <Heart className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Join as a Patient
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Take control of your health journey
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="bg-teal-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HealthCare</h1>
              <p className="text-gray-600">Management System</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

              <div className="mb-6">
                <Link
                  to="/"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Link>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Register as a patient to get started
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Aadhaar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="aadhaar"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      maxLength={12}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter 12-digit Aadhaar"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg"
                      placeholder="Create password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/" className="text-teal-600 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}