"use client";
import React, { useState } from "react";
import Link from "next/link";
import UseAuth from "../hooks/UseAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {handlelogin} = UseAuth()
  const handleSubmit = async(e) => {
    e.preventDefault();
    await handlelogin({username,password})
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E8E2D8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#9F7E69]/10 to-[#7A8B99]/10 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#9F7E69] rounded-full mix-blend-multiply filter blur-xl "></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#7A8B99] rounded-full mix-blend-multiply filter blur-xl  animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#B48C6C] rounded-full mix-blend-multiply filter blur-xl  animation-delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-16">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-2xl flex items-center justify-center">
                <span className="text-white text-2xl font-light">+</span>
              </div>
              <span className="text-3xl font-serif text-[#2C3A4A]">
                MediCare
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-serif text-[#2C3A4A] leading-tight">
                Welcome Back
                <span className="block text-2xl font-sans text-[#6B7280] mt-2 font-light">
                  to your modern healthcare hub
                </span>
              </h2>

              <p className="text-[#6B7280] text-lg leading-relaxed">
                Access patient records, manage appointments, and collaborate
                with your team in a secure, sophisticated environment.
              </p>

              <div className="space-y-4 pt-8">
                {[
                  "Secure & Compliant",
                  "Real-time Updates",
                  "Intuitive Interface",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#9F7E69] rounded-full"></div>
                    <span className="text-[#2C3A4A]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm text-[#6B7280]">
            © 2026 MediCare Systems. All rights reserved.
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="lg:hidden flex items-center space-x-3 mb-12">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-light">+</span>
              </div>
              <span className="text-2xl font-serif text-[#2C3A4A]">
                MediCare
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-serif text-[#2C3A4A] mb-2">
                Sign In
              </h2>
              <p className="text-[#6B7280]">
                Please enter your credentials to access the system
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#2C3A4A]"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] transition-all text-[#2C3A4A] placeholder-[#6B7280]/50"
                    placeholder="johndoe or john@hospital.com"
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2C3A4A]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] transition-all text-[#2C3A4A] placeholder-[#6B7280]/50"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5 text-[#6B7280]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-[#6B7280]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#9F7E69] bg-[#F5F1EB] border-[#E8E2D8] rounded focus:ring-[#9F7E69]/30 focus:ring-2"
                  />
                  <span className="text-sm text-[#6B7280]">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#9F7E69] hover:text-[#7A8B99] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/50 focus:ring-offset-2"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-[#6B7280] mt-8">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#9F7E69] hover:text-[#7A8B99] font-medium transition-colors"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
