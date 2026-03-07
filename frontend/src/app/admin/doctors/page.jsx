// app/admin/doctors/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

const DoctorPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock Doctors Data
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Chen",
      email: "sarah.chen@medicare.com",
      phone: "+1 (555) 123-4567",
      specialization: "Interventional Cardiology",
      department: "Cardiology",
      departmentId: 1,
      qualification: "MD, FACC",
      experience: 15,
      joiningDate: "2015-03-15",
      status: "available",
      patientsToday: 8,
      totalPatients: 1245,
      rating: 4.9,
      image: "👩‍⚕️",
      shift: "morning",
      consultationFee: 250,
      education: ["Harvard Medical School", "Stanford University"],
      certifications: [
        "American Board of Internal Medicine",
        "Cardiology Board Certified",
      ],
      languages: ["English", "Mandarin", "Spanish"],
      about:
        "Dr. Sarah Chen is a leading interventional cardiologist with over 15 years of experience in complex cardiac procedures.",
      emergencyContact: "+1 (555) 987-6543",
      address: "123 Medical Center Dr, Suite 300, Boston, MA 02115",
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      email: "james.wilson@medicare.com",
      phone: "+1 (555) 234-5678",
      specialization: "Neurosurgery",
      department: "Neurology",
      departmentId: 2,
      qualification: "MD, PhD, FACS",
      experience: 20,
      joiningDate: "2010-06-20",
      status: "busy",
      patientsToday: 12,
      totalPatients: 1890,
      rating: 4.8,
      image: "👨‍⚕️",
      shift: "evening",
      consultationFee: 350,
      education: ["Johns Hopkins University", "Mayo Clinic"],
      certifications: [
        "American Board of Neurological Surgery",
        "Neurocritical Care",
      ],
      languages: ["English", "German"],
      about:
        "Dr. James Wilson is a renowned neurosurgeon specializing in minimally invasive brain surgery and spine procedures.",
      emergencyContact: "+1 (555) 876-5432",
      address: "456 Neuroscience Wing, New York, NY 10019",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@medicare.com",
      phone: "+1 (555) 345-6789",
      specialization: "Pediatric Intensive Care",
      department: "Pediatrics",
      departmentId: 3,
      qualification: "MD, FAAP",
      experience: 12,
      joiningDate: "2018-09-10",
      status: "available",
      patientsToday: 15,
      totalPatients: 876,
      rating: 5.0,
      image: "👩‍⚕️",
      shift: "morning",
      consultationFee: 200,
      education: [
        "University of California San Francisco",
        "Children's Hospital Los Angeles",
      ],
      certifications: [
        "American Board of Pediatrics",
        "Pediatric Critical Care",
      ],
      languages: ["English", "Spanish", "French"],
      about:
        "Dr. Emily Rodriguez is dedicated to providing compassionate care to critically ill children and their families.",
      emergencyContact: "+1 (555) 765-4321",
      address: "789 Children's Way, Los Angeles, CA 90027",
    },
    {
      id: 4,
      name: "Dr. Michael Kim",
      email: "michael.kim@medicare.com",
      phone: "+1 (555) 456-7890",
      specialization: "Orthopedic Surgery",
      department: "Orthopedics",
      departmentId: 4,
      qualification: "MD, FAAOS",
      experience: 18,
      joiningDate: "2012-11-05",
      status: "offline",
      patientsToday: 0,
      totalPatients: 1567,
      rating: 4.7,
      image: "👨‍⚕️",
      shift: "flexible",
      consultationFee: 275,
      education: ["Columbia University", "Hospital for Special Surgery"],
      certifications: [
        "American Board of Orthopaedic Surgery",
        "Sports Medicine",
      ],
      languages: ["English", "Korean"],
      about:
        "Dr. Michael Kim specializes in joint replacement and sports medicine, helping athletes return to peak performance.",
      emergencyContact: "+1 (555) 654-3210",
      address: "321 Orthopedic Plaza, Chicago, IL 60611",
    },
    {
      id: 5,
      name: "Dr. Lisa Patel",
      email: "lisa.patel@medicare.com",
      phone: "+1 (555) 567-8901",
      specialization: "Diagnostic Radiology",
      department: "Radiology",
      departmentId: 5,
      qualification: "MD, DABR",
      experience: 10,
      joiningDate: "2019-04-22",
      status: "available",
      patientsToday: 22,
      totalPatients: 654,
      rating: 4.9,
      image: "👩‍⚕️",
      shift: "night",
      consultationFee: 225,
      education: ["Northwestern University", "Massachusetts General Hospital"],
      certifications: ["American Board of Radiology", "Neuroradiology"],
      languages: ["English", "Hindi", "Gujarati"],
      about:
        "Dr. Lisa Patel is an expert in advanced imaging techniques including MRI, CT, and PET scans for accurate diagnosis.",
      emergencyContact: "+1 (555) 543-2109",
      address: "555 Imaging Center, Houston, TX 77030",
    },
    {
      id: 6,
      name: "Dr. Robert Johnson",
      email: "robert.johnson@medicare.com",
      phone: "+1 (555) 678-9012",
      specialization: "Emergency Medicine",
      department: "Emergency",
      departmentId: 6,
      qualification: "MD, FACEP",
      experience: 14,
      joiningDate: "2016-07-18",
      status: "busy",
      patientsToday: 28,
      totalPatients: 2134,
      rating: 4.8,
      image: "👨‍⚕️",
      shift: "evening",
      consultationFee: 275,
      education: ["University of Pennsylvania", "Penn Medicine"],
      certifications: [
        "American Board of Emergency Medicine",
        "Advanced Trauma Life Support",
      ],
      languages: ["English"],
      about:
        "Dr. Robert Johnson leads the emergency department with expertise in trauma care and critical interventions.",
      emergencyContact: "+1 (555) 432-1098",
      address: "777 Emergency Wing, Miami, FL 33101",
    },
    {
      id: 7,
      name: "Dr. Maria Garcia",
      email: "maria.garcia@medicare.com",
      phone: "+1 (555) 789-0123",
      specialization: "Medical Oncology",
      department: "Oncology",
      departmentId: 7,
      qualification: "MD, FACP",
      experience: 16,
      joiningDate: "2014-02-28",
      status: "available",
      patientsToday: 10,
      totalPatients: 1432,
      rating: 5.0,
      image: "👩‍⚕️",
      shift: "morning",
      consultationFee: 300,
      education: ["MD Anderson Cancer Center", "Johns Hopkins Hospital"],
      certifications: [
        "American Board of Internal Medicine",
        "Medical Oncology",
      ],
      languages: ["English", "Spanish", "Portuguese"],
      about:
        "Dr. Maria Garcia provides comprehensive cancer care with a focus on personalized treatment plans and clinical trials.",
      emergencyContact: "+1 (555) 321-0987",
      address: "888 Cancer Center, San Antonio, TX 78205",
    },
    {
      id: 8,
      name: "Dr. David Lee",
      email: "david.lee@medicare.com",
      phone: "+1 (555) 890-1234",
      specialization: "Critical Care",
      department: "Cardiology ICU",
      departmentId: 8,
      qualification: "MD, FCCP",
      experience: 13,
      joiningDate: "2017-08-12",
      status: "on-leave",
      patientsToday: 0,
      totalPatients: 987,
      rating: 4.8,
      image: "👨‍⚕️",
      shift: "flexible",
      consultationFee: 280,
      education: ["Cleveland Clinic", "Duke University"],
      certifications: [
        "American Board of Internal Medicine",
        "Critical Care Medicine",
      ],
      languages: ["English", "Chinese"],
      about:
        "Dr. David Lee specializes in managing critically ill patients in the cardiac intensive care unit.",
      emergencyContact: "+1 (555) 210-9876",
      address: "444 ICU Tower, Philadelphia, PA 19104",
    },
  ]);

  // Mock Departments for filter
  const departments = [
    "All Departments",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Radiology",
    "Emergency",
    "Oncology",
    "Cardiology ICU",
  ];

  // Invite Form State
  const [inviteData, setInviteData] = useState({
    email: "",
    specialization: "",
    department: "",
    message: "",
  });

  // Register Form State
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
    qualification: "",
    experience: "",
    shift: "morning",
    consultationFee: "",
    languages: "",
    about: "",
    emergencyContact: "",
    address: "",
  });

  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || doctor.department === filterDepartment;
    const matchesStatus =
      filterStatus === "all" || doctor.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle Invite Doctor
  const handleInviteDoctor = (e) => {
    e.preventDefault();
    console.log("Invite sent to:", inviteData.email);
    // Here you would send invitation email
    setShowInviteModal(false);
    setInviteData({
      email: "",
      specialization: "",
      department: "",
      message: "",
    });
    alert(`Invitation sent to ${inviteData.email}`);
  };

  // Handle Register Doctor
  const handleRegisterDoctor = (e) => {
    e.preventDefault();

    const newDoctor = {
      id: doctors.length + 1,
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      specialization: registerData.specialization,
      department: registerData.department,
      departmentId: departments.indexOf(registerData.department),
      qualification: registerData.qualification,
      experience: parseInt(registerData.experience) || 0,
      joiningDate: new Date().toISOString().split("T")[0],
      status: "available",
      patientsToday: 0,
      totalPatients: 0,
      rating: 0,
      image: registerData.name.includes("Dr.") ? "👨‍⚕️" : "👩‍⚕️",
      shift: registerData.shift,
      consultationFee: parseInt(registerData.consultationFee) || 0,
      education: [],
      certifications: [],
      languages: registerData.languages.split(",").map((l) => l.trim()),
      about: registerData.about,
      emergencyContact: registerData.emergencyContact,
      address: registerData.address,
    };

    setDoctors([...doctors, newDoctor]);
    setShowRegisterModal(false);
    setRegisterData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      department: "",
      qualification: "",
      experience: "",
      shift: "morning",
      consultationFee: "",
      languages: "",
      about: "",
      emergencyContact: "",
      address: "",
    });
    alert(`Dr. ${registerData.name} registered successfully!`);
  };

  // Handle Delete Doctor
  const handleDeleteDoctor = (id) => {
    if (
      confirm("Are you sure you want to remove this doctor from the system?")
    ) {
      setDoctors(doctors.filter((doc) => doc.id !== id));
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-[#6D8A7D]/20 text-[#6D8A7D]";
      case "busy":
        return "bg-[#C97C6D]/20 text-[#C97C6D]";
      case "offline":
        return "bg-[#6B7280]/20 text-[#6B7280]";
      case "on-leave":
        return "bg-[#9F7E69]/20 text-[#9F7E69]";
      default:
        return "bg-[#6B7280]/20 text-[#6B7280]";
    }
  };

  // Shift color mapping
  const getShiftColor = (shift) => {
    switch (shift) {
      case "morning":
        return "bg-[#B48C6C]/20 text-[#B48C6C]";
      case "evening":
        return "bg-[#7A8B99]/20 text-[#7A8B99]";
      case "night":
        return "bg-[#2C3A4A]/20 text-[#2C3A4A]";
      case "flexible":
        return "bg-[#9F7E69]/20 text-[#9F7E69]";
      default:
        return "bg-[#6B7280]/20 text-[#6B7280]";
    }
  };

  return (
    <>
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"} p-8`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#2C3A4A]">
              👨‍⚕️ Doctors Management
            </h1>
            <p className="text-[#6B7280] mt-1">
              Manage medical staff, invite new doctors, and view doctor profiles
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-white/90 backdrop-blur-sm text-[#2C3A4A] border border-[#9F7E69]/30 px-6 py-3 rounded-xl font-medium hover:bg-[#F5F1EB] transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Invite Doctor</span>
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span>Register Doctor</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">👨‍⚕️</span>
              <span className="text-sm text-[#6D8A7D]">+3 this month</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {doctors.length}
            </h3>
            <p className="text-sm text-[#6B7280]">Total Doctors</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {doctors.filter((d) => d.status === "available").length}
            </h3>
            <p className="text-sm text-[#6B7280]">Available Now</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">⏰</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {doctors.filter((d) => d.status === "busy").length}
            </h3>
            <p className="text-sm text-[#6B7280]">With Patients</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {doctors.reduce((sum, doc) => sum + doc.patientsToday, 0)}
            </h3>
            <p className="text-sm text-[#6B7280]">Patients Today</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">⭐</span>
              <span className="text-sm text-[#B48C6C]">Average</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {(
                doctors.reduce((sum, doc) => sum + doc.rating, 0) /
                doctors.length
              ).toFixed(1)}
            </h3>
            <p className="text-sm text-[#6B7280]">Avg Rating</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm flex items-center w-64">
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-[#2C3A4A] placeholder-[#6B7280] w-full"
              />
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-[#E8E2D8] rounded-xl text-[#2C3A4A] focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
            >
              <option value="all">All Departments</option>
              {departments.slice(1).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-[#E8E2D8] rounded-xl text-[#2C3A4A] focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>

          <div className="text-sm text-[#6B7280]">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Doctor Header with Gradient */}
              <div className="h-24 bg-gradient-to-r from-[#9F7E69]/30 to-[#7A8B99]/30 relative">
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg border-4 border-white">
                    {doctor.image}
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}
                  >
                    {doctor.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getShiftColor(doctor.shift)}`}
                  >
                    {doctor.shift}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="pt-16 p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-serif text-[#2C3A4A]">
                      {doctor.name}
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                      {doctor.specialization}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm font-medium text-[#2C3A4A]">
                      {doctor.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full">
                    {doctor.department}
                  </span>
                  <span className="text-xs px-2 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full">
                    {doctor.experience} yrs exp
                  </span>
                </div>

                <p className="text-sm text-[#6B7280] line-clamp-2 mb-4">
                  {doctor.about}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-[#F5F1EB] rounded-xl">
                    <p className="text-xs text-[#6B7280]">Today</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      {doctor.patientsToday}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-[#F5F1EB] rounded-xl">
                    <p className="text-xs text-[#6B7280]">Total</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      {doctor.totalPatients}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-[#F5F1EB] rounded-xl">
                    <p className="text-xs text-[#6B7280]">Fee</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      ${doctor.consultationFee}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm border-t border-[#E8E2D8] pt-4">
                  <div className="flex items-center text-[#6B7280]">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[#2C3A4A]">{doctor.email}</span>
                  </div>
                  <div className="flex items-center text-[#6B7280]">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-[#2C3A4A]">{doctor.phone}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-[#E8E2D8]">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="p-2 text-[#6B7280] hover:text-[#9F7E69] hover:bg-[#F5F1EB] rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
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
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${doctor.email}`)
                    }
                    className="p-2 text-[#6B7280] hover:text-[#6D8A7D] hover:bg-[#F5F1EB] rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="p-2 text-[#6B7280] hover:text-[#C97C6D] hover:bg-[#F5F1EB] rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Invite Doctor Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#2C3A4A]">
                    Invite Doctor
                  </h2>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="p-2 hover:bg-[#F5F1EB] rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleInviteDoctor} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Email Address <span className="text-[#C97C6D]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={inviteData.email}
                      onChange={(e) =>
                        setInviteData({ ...inviteData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="doctor@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={inviteData.specialization}
                      onChange={(e) =>
                        setInviteData({
                          ...inviteData,
                          specialization: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      placeholder="e.g., Cardiology"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Department
                    </label>
                    <select
                      value={inviteData.department}
                      onChange={(e) =>
                        setInviteData({
                          ...inviteData,
                          department: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                    >
                      <option value="">Select Department</option>
                      {departments.slice(1).map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      value={inviteData.message}
                      onChange={(e) =>
                        setInviteData({
                          ...inviteData,
                          message: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A] resize-none"
                      placeholder="Add a personal note..."
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E8E2D8]">
                    <button
                      type="button"
                      onClick={() => setShowInviteModal(false)}
                      className="px-6 py-3 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Send Invitation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Register Doctor Modal */}
        {showRegisterModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full my-8">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#2C3A4A]">
                    Register New Doctor
                  </h2>
                  <button
                    onClick={() => setShowRegisterModal(false)}
                    className="p-2 hover:bg-[#F5F1EB] rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleRegisterDoctor} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Full Name <span className="text-[#C97C6D]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="Dr. John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Email <span className="text-[#C97C6D]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="john.doe@medicare.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Phone <span className="text-[#C97C6D]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={registerData.phone}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Specialization <span className="text-[#C97C6D]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.specialization}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            specialization: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="e.g., Cardiology"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Department <span className="text-[#C97C6D]">*</span>
                      </label>
                      <select
                        required
                        value={registerData.department}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            department: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      >
                        <option value="">Select Department</option>
                        {departments.slice(1).map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Qualification <span className="text-[#C97C6D]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.qualification}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            qualification: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="e.g., MD, FACC"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={registerData.experience}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            experience: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Shift
                      </label>
                      <select
                        value={registerData.shift}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            shift: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                      >
                        <option value="morning">Morning</option>
                        <option value="evening">Evening</option>
                        <option value="night">Night</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Consultation Fee ($)
                      </label>
                      <input
                        type="number"
                        value={registerData.consultationFee}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            consultationFee: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="250"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Languages Spoken
                      </label>
                      <input
                        type="text"
                        value={registerData.languages}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            languages: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="English, Spanish, French (comma separated)"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        About / Bio
                      </label>
                      <textarea
                        value={registerData.about}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            about: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A] resize-none"
                        placeholder="Brief description of the doctor's expertise and approach..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={registerData.emergencyContact}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            emergencyContact: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">
                        Address
                      </label>
                      <input
                        type="text"
                        value={registerData.address}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                        placeholder="123 Medical Center Dr"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E8E2D8]">
                    <button
                      type="button"
                      onClick={() => setShowRegisterModal(false)}
                      className="px-6 py-3 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Register Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Doctor Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full my-8">
              {/* Header with Gradient */}
              <div
                className={`p-8 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-t-3xl`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-6xl">
                      {selectedDoctor.image}
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif">
                        {selectedDoctor.name}
                      </h2>
                      <p className="text-white/90 text-lg">
                        {selectedDoctor.specialization}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}
                        >
                          {selectedDoctor.status}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}
                        >
                          {selectedDoctor.shift} shift
                        </span>
                        <span className="flex items-center">
                          <span className="text-yellow-300 mr-1">★</span>
                          <span>{selectedDoctor.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-[#F5F1EB] p-4 rounded-xl text-center">
                    <p className="text-sm text-[#6B7280]">Department</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      {selectedDoctor.department}
                    </p>
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl text-center">
                    <p className="text-sm text-[#6B7280]">Experience</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      {selectedDoctor.experience} years
                    </p>
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl text-center">
                    <p className="text-sm text-[#6B7280]">Patients Today</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      {selectedDoctor.patientsToday}
                    </p>
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl text-center">
                    <p className="text-sm text-[#6B7280]">Total Patients</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      {selectedDoctor.totalPatients}
                    </p>
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl text-center">
                    <p className="text-sm text-[#6B7280]">Consultation Fee</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">
                      ${selectedDoctor.consultationFee}
                    </p>
                  </div>
                </div>

                {/* About */}
                <div>
                  <h3 className="text-lg font-serif text-[#2C3A4A] mb-2">
                    About
                  </h3>
                  <p className="text-[#6B7280]">{selectedDoctor.about}</p>
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-serif text-[#2C3A4A] mb-2">
                      Education
                    </h3>
                    <ul className="space-y-2">
                      {selectedDoctor.education.map((edu, index) => (
                        <li
                          key={index}
                          className="flex items-center text-[#6B7280]"
                        >
                          <span className="w-2 h-2 bg-[#9F7E69] rounded-full mr-2"></span>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-[#2C3A4A] mb-2">
                      Certifications
                    </h3>
                    <ul className="space-y-2">
                      {selectedDoctor.certifications.map((cert, index) => (
                        <li
                          key={index}
                          className="flex items-center text-[#6B7280]"
                        >
                          <span className="w-2 h-2 bg-[#7A8B99] rounded-full mr-2"></span>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Languages & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-serif text-[#2C3A4A] mb-2">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-[#2C3A4A] mb-2">
                      Contact Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-[#6B7280]">
                        📧 {selectedDoctor.email}
                      </p>
                      <p className="text-[#6B7280]">
                        📞 {selectedDoctor.phone}
                      </p>
                      <p className="text-[#6B7280]">
                        🆘 {selectedDoctor.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-serif text-[#2C3A4A] mb-2">
                    Address
                  </h3>
                  <p className="text-[#6B7280]">{selectedDoctor.address}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E8E2D8]">
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${selectedDoctor.email}`)
                    }
                    className="px-6 py-3 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                  >
                    Send Email
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDoctor(null);
                      // Here you would open edit modal
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorPage;
