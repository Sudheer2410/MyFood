import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Phone, MapPin, ArrowLeft, ChefHat, Eye, EyeOff } from 'lucide-react';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful!');
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 relative overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 w-full">
        <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl max-w-sm w-full p-4 border border-white/30">
          {/* Back Button */}
          <Link 
            to="/login" 
            className="inline-flex items-center text-white/80 hover:text-white mb-3 transition-all duration-300 hover:scale-105 text-sm"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Back to Login
          </Link>

          {/* Header */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/30">
              <ChefHat className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-white/80 text-xs">Join our food community</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-white/90">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-3 h-3 group-focus-within:text-white transition-colors" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300 text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-white/90">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-3 h-3 group-focus-within:text-white transition-colors" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300 text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-white/90">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-3 h-3 group-focus-within:text-white transition-colors" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-8 pr-8 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300 text-sm"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Optional fields in a more compact layout */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-white/90">
                  Phone (Optional)
                </label>
                <div className="relative group">
                  <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/60 w-3 h-3 group-focus-within:text-white transition-colors" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-6 pr-2 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300 text-xs"
                    placeholder="Phone"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-white/90">
                  Address (Optional)
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/60 w-3 h-3 group-focus-within:text-white transition-colors" />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-6 pr-2 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-white placeholder-white/60 transition-all duration-300 text-xs"
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:bg-white/10 text-white py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group hover:scale-105 disabled:hover:scale-100 border border-white/30 text-sm"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-3">
            <p className="text-white/80 text-xs">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:text-white/80 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage; 