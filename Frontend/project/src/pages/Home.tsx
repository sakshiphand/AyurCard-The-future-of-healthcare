import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Users,
  Zap,
  Lock,
  User,
  Sparkles,
  Activity,
  ChevronRight,
} from 'lucide-react';
import { login } from '../api/auth';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const [formData, setFormData] = useState({
    aadhaar: '',
    password: '',
    role: 'user',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{12}$/.test(formData.aadhaar)) {
      setError('Aadhaar must be exactly 12 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      const { token, role, id, name } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', name);

      navigate(role === 'doctor' ? '/doctor/dashboard' : '/user/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.msg || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      desc: 'Military-grade encryption protects your health data',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      desc: 'Connect with certified medical professionals',
      gradient: 'from-teal-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      desc: 'Smart health insights and predictions',
      gradient: 'from-violet-500 to-purple-500',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Doctors', value: '2K+' },
    { label: 'Records Secured', value: '1M+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <AnimatePresence mode="wait">
        {!showLogin ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <div className="container mx-auto px-6 py-12">
              <nav className="flex justify-between items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    AyurCard
                  </span>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogin(true)}
                  className="px-6 py-2.5 bg-white text-blue-600 rounded-full font-semibold shadow-lg shadow-blue-100 hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-blue-100"
                >
                  Sign In
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </nav>

              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      AI-Powered Healthcare
                    </span>
                  </div>

                  <h1 className="text-6xl font-bold mb-6 leading-tight">
                    Your Digital
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600">
                      Health Identity
                    </span>
                  </h1>

                  <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                    Securely store medical records, connect with expert doctors,
                    and get AI-powered health insights all in one place.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLogin(true)}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-blue-200 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                    >
                      Get Started Free
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <button
  onClick={() => navigate('/admin/complaints')}
  className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
>
  Admin Portal
</button>
                  </div>

                  <div className="flex items-center gap-8 mt-12">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <div className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl opacity-20 blur-3xl"></div>
                  <img
                    src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg"
                    alt="Healthcare"
                    className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-8 border-white"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                        <Activity className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Health Score
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          98%
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid md:grid-cols-3 gap-8"
              >
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                  >
                    <div
                      className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen relative z-10"
          >
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setShowLogin(false)}
                className="absolute top-8 left-8 flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
              >
                <ArrowRight className="h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center max-w-lg relative z-10"
              >
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Heart className="h-14 w-14" />
                </div>
                <h1 className="text-5xl font-bold mb-6">
                  Welcome Back to AyurCard
                </h1>
                <p className="text-xl opacity-90 mb-8 leading-relaxed">
                  Your trusted digital health companion. Secure, smart, and
                  always accessible.
                </p>

                <div className="grid grid-cols-2 gap-4 text-left">
                  {[
                    'Encrypted Storage',
                    'Instant Access',
                    '24/7 Support',
                    'AI Insights',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-md w-full"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                  <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-3 text-gray-900">
                      Sign In
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Welcome back! Please enter your details.
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {error}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Aadhaar Number
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          name="aadhaar"
                          placeholder="Enter 12-digit Aadhaar"
                          value={formData.aadhaar}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                          maxLength={12}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sign in as
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                      >
                        <option value="user">Patient</option>
                        <option value="doctor">Doctor</option>
                      </select>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-600 mb-4 font-medium">
                      Don't have an account?
                    </p>
                    <div className="space-y-3">
                      <Link
                        to="/register/user"
                        className="block w-full text-center py-3 bg-teal-50 text-teal-700 rounded-xl font-semibold hover:bg-teal-100 transition-colors"
                      >
                        Register as Patient
                      </Link>
                      <Link
                        to="/register/doctor"
                        className="block w-full text-center py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors"
                      >
                        Register as Doctor
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
