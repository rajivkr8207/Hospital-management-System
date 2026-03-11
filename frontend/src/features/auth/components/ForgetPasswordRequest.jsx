// app/forgot-password/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import UseAuth from '../hooks/UseAuth';
import { ForgotPasswordReq } from '../services/auth.api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { handleForgotPasswordRequest } = UseAuth()
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call - Replace with actual API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In real app, you would call your backend here
      console.log('Password reset requested for:', email);
    }, 1500);
   await ForgotPasswordReq({email: email})
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E8E2D8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-light">+</span>
            </div>
            <span className="text-3xl font-serif text-[#2C3A4A]">MediCare</span>
          </div>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Decorative Top Bar */}
          <div className="h-2 bg-gradient-to-r from-[#9F7E69] via-[#7A8B99] to-[#B48C6C]"></div>

          <div className="p-8 sm:p-10">
            {!isSubmitted ? (
              /* Forgot Password Form */
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#9F7E69]/20 to-[#7A8B99]/20 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-[#9F7E69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-serif text-[#2C3A4A] mb-2">Forgot Password?</h1>
                  <p className="text-[#6B7280]">
                    No worries! Enter your email and we&apos;ll send you reset instructions.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-[#2C3A4A]">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 bg-[#F5F1EB] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] transition-all text-[#2C3A4A] placeholder-[#6B7280]/50 ${error ? 'border-[#C97C6D]' : 'border-[#E8E2D8]'
                          }`}
                        placeholder="john.doe@example.com"
                        disabled={isLoading}
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    {error && (
                      <p className="text-sm text-[#C97C6D] mt-1">{error}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Reset Password</span>
                    )}
                  </button>

                  {/* Back to Login */}
                  <div className="text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center text-sm text-[#6B7280] hover:text-[#9F7E69] transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Login
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              /* Success Message - Email Sent */
              <div className="text-center">
                {/* Success Animation */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#6D8A7D]/20 to-[#7A8B99]/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#6D8A7D] to-[#7A8B99] rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <h2 className="text-2xl font-serif text-[#2C3A4A] mb-3">Check Your Email</h2>

                <div className="bg-[#F5F1EB] rounded-2xl p-6 mb-6">
                  <p className="text-[#2C3A4A] mb-4">
                    We&apos;ve sent a password reset link to:
                  </p>
                  <p className="text-lg font-medium text-[#9F7E69] break-all bg-white py-3 px-4 rounded-xl">
                    {email}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-left">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#6D8A7D]/20 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-[#6D8A7D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Click the link in the email to reset your password
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 text-left">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#6D8A7D]/20 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-[#6D8A7D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      The link will expire in 24 hours
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 text-left">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#6D8A7D]/20 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-[#6D8A7D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Didn&apos;t receive it? Check your spam folder
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-8">
                  <Link
                    href="https://mail.google.com"
                    target="_blank"
                    className="block w-full bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Open Gmail
                  </Link>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="block w-full bg-[#F5F1EB] text-[#2C3A4A] py-3.5 rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                  >
                    Use Different Email
                  </button>

                  <Link
                    href="/login"
                    className="block text-center text-sm text-[#6B7280] hover:text-[#9F7E69] transition-colors mt-4"
                  >
                    Back to Login
                  </Link>
                </div>

                {/* Resend Option */}
                <div className="mt-6 pt-6 border-t border-[#E8E2D8]">
                  <p className="text-sm text-[#6B7280]">
                    Didn&apos;t get the email?{' '}
                    <button
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          alert('Reset email resent successfully!');
                        }, 1000);
                      }}
                      disabled={isLoading}
                      className="text-[#9F7E69] hover:text-[#7A8B99] font-medium disabled:opacity-50"
                    >
                      {isLoading ? 'Resending...' : 'Click to resend'}
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-[#6B7280]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your information is protected by 256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;