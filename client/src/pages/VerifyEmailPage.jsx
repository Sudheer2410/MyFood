import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowLeft, ChefHat } from 'lucide-react';
import { toast } from 'react-toastify';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setVerificationStatus('error');
        setMessage('Invalid verification link. Please check your email and try again.');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/verify?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setMessage(data.message || 'Email verified successfully!');
          toast.success('Email verified successfully!');
        } else {
          setVerificationStatus('error');
          setMessage(data.message || 'Verification failed. Please try again.');
          toast.error(data.message || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
        setMessage('Verification failed. Please try again.');
        toast.error('Verification failed');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-white/30">
          {/* Back Button */}
          <Link 
            to="/login" 
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-all duration-300 hover:scale-105 text-sm"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Back to Login
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
              <ChefHat className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Email Verification</h1>
            <p className="text-white/80 text-sm">Verifying your email address</p>
          </div>

          {/* Verification Status */}
          <div className="text-center">
            {verificationStatus === 'verifying' && (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                <p className="text-white/80">Verifying your email...</p>
              </div>
            )}

            {verificationStatus === 'success' && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-lg border border-green-500/30">
                  <CheckCircle className="text-green-400 w-8 h-8" />
                </div>
                <h2 className="text-xl font-semibold text-white">Success!</h2>
                <p className="text-white/80 text-sm">{message}</p>
                <Link
                  to="/login"
                  className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border border-white/30"
                >
                  Continue to Login
                </Link>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-lg border border-red-500/30">
                  <XCircle className="text-red-400 w-8 h-8" />
                </div>
                <h2 className="text-xl font-semibold text-white">Verification Failed</h2>
                <p className="text-white/80 text-sm">{message}</p>
                <div className="space-y-2">
                  <Link
                    to="/register"
                    className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border border-white/30 mr-2"
                  >
                    Register Again
                  </Link>
                  <Link
                    to="/login"
                    className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage; 