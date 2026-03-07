// app/register/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UseAuth from "../hooks/UseAuth";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    username: "",
    dob: "",
    gender: "",
    phone_no: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    blood_group: "",
    description: "",
    emergency_contact_number: "",
  });

  const [imageurl, setImageurl] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const {handleRegister} = UseAuth()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageurl(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration data:", { ...formData, imageurl });
    handleRegister({ ...formData, imageurl })
    // Handle registration logic here
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Blood group options
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E8E2D8] py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-light">+</span>
            </div>
            <span className="text-3xl font-serif text-[#2C3A4A]">MediCare</span>
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium
                    ${
                      currentStep >= step
                        ? "bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white"
                        : "bg-[#F5F1EB] text-[#6B7280]"
                    }
                  `}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`
                      w-20 h-1 mx-2 rounded
                      ${currentStep > step ? "bg-[#9F7E69]" : "bg-[#E8E2D8]"}
                    `}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-[#6B7280] px-2">
              <span>Personal Info</span>
              <span>Contact Details</span>
              <span>Medical Info</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-[#2C3A4A] mb-6">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Full Name <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="Dr. John Smith"
                      required
                    />
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Username <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="dr_john_smith"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Email Address <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="john.smith@hospital.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Password <span className="text-[#C97C6D]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
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

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Date of Birth <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Gender <span className="text-[#C97C6D]">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Profile Photo
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-[#F5F1EB] border-2 border-dashed border-[#9F7E69]/30 flex items-center justify-center overflow-hidden">
                          {photoPreview ? (
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              className="w-8 h-8 text-[#9F7E69]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="w-full text-sm text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[#9F7E69] file:text-white hover:file:bg-[#7A8B99] file:cursor-pointer file:transition-colors"
                        />
                        <p className="mt-1 text-xs text-[#6B7280]">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-[#2C3A4A] mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Phone Number <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Emergency Contact Number{" "}
                      <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergency_contact_number"
                      value={formData.emergency_contact_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Address <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="123 Main Street, Apt 4B"
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      City <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="New York"
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      State <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="NY"
                      required
                    />
                  </div>

                  {/* Pincode */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Pincode <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Medical Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-[#2C3A4A] mb-6">
                  Medical Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Blood Group */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Blood Group <span className="text-[#C97C6D]">*</span>
                    </label>
                    <select
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description/Notes */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Medical Description / Notes
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A] resize-none"
                      placeholder="Any allergies, chronic conditions, or important medical notes..."
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mt-8 p-6 bg-[#F5F1EB] rounded-2xl">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-[#9F7E69] bg-white border-[#E8E2D8] rounded focus:ring-[#9F7E69]/30"
                      required
                    />
                    <span className="text-sm text-[#6B7280]">
                      I confirm that the information provided is accurate and I
                      agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-[#9F7E69] hover:text-[#7A8B99]"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-[#9F7E69] hover:text-[#7A8B99]"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[#E8E2D8]">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  currentStep === 1
                    ? "bg-[#F5F1EB] text-[#6B7280] cursor-not-allowed"
                    : "bg-[#F5F1EB] text-[#2C3A4A] hover:bg-[#E8E2D8]"
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Complete Registration
                </button>
              )}
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-[#6B7280] mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#9F7E69] hover:text-[#7A8B99] font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
