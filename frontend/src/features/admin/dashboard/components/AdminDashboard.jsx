// app/admin/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "../../context/AdminContext";

const AdminDashboard = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAdmin();
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Mock Data
  const departments = [
    {
      id: 1,
      name: "Cardiology",
      doctorCount: 12,
      patientCount: 156,
      icon: "❤️",
      color: "from-[#C97C6D] to-[#B48C6C]",
    },
    {
      id: 2,
      name: "Neurology",
      doctorCount: 8,
      patientCount: 98,
      icon: "🧠",
      color: "from-[#7A8B99] to-[#6D8A7D]",
    },
    {
      id: 3,
      name: "Pediatrics",
      doctorCount: 15,
      patientCount: 203,
      icon: "👶",
      color: "from-[#9F7E69] to-[#B48C6C]",
    },
    {
      id: 4,
      name: "Orthopedics",
      doctorCount: 10,
      patientCount: 134,
      icon: "🦴",
      color: "from-[#6D8A7D] to-[#7A8B99]",
    },
    {
      id: 5,
      name: "Radiology",
      doctorCount: 6,
      patientCount: 89,
      icon: "🔬",
      color: "from-[#B48C6C] to-[#9F7E69]",
    },
    {
      id: 6,
      name: "Emergency",
      doctorCount: 18,
      patientCount: 267,
      icon: "🚑",
      color: "from-[#C97C6D] to-[#B48C6C]",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      department: "Cardiology",
      patients: 24,
      status: "available",
      image: "👩‍⚕️",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      department: "Neurology",
      patients: 18,
      status: "busy",
      image: "👨‍⚕️",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      department: "Pediatrics",
      patients: 31,
      status: "available",
      image: "👩‍⚕️",
      rating: 5.0,
    },
    {
      id: 4,
      name: "Dr. Michael Kim",
      department: "Orthopedics",
      patients: 15,
      status: "offline",
      image: "👨‍⚕️",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Dr. Lisa Patel",
      department: "Radiology",
      patients: 12,
      status: "available",
      image: "👩‍⚕️",
      rating: 4.9,
    },
  ];

  const patients = [
    {
      id: 1,
      name: "John Thompson",
      age: 45,
      department: "Cardiology",
      doctor: "Dr. Sarah Chen",
      lastVisit: "2026-03-06",
      status: "active",
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 32,
      department: "Neurology",
      doctor: "Dr. James Wilson",
      lastVisit: "2026-03-06",
      status: "active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 58,
      department: "Orthopedics",
      doctor: "Dr. Michael Kim",
      lastVisit: "2026-03-05",
      status: "discharged",
    },
    {
      id: 4,
      name: "Patricia Lee",
      age: 27,
      department: "Pediatrics",
      doctor: "Dr. Emily Rodriguez",
      lastVisit: "2026-03-06",
      status: "active",
    },
    {
      id: 5,
      name: "David Miller",
      age: 62,
      department: "Cardiology",
      doctor: "Dr. Sarah Chen",
      lastVisit: "2026-03-04",
      status: "active",
    },
  ];

  const todayTreatments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "John Thompson",
      doctor: "Dr. Sarah Chen",
      treatment: "Cardiac Consultation",
      status: "completed",
      department: "Cardiology",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Maria Garcia",
      doctor: "Dr. James Wilson",
      treatment: "MRI Scan",
      status: "in-progress",
      department: "Neurology",
    },
    {
      id: 3,
      time: "11:45 AM",
      patient: "Emma Watson",
      doctor: "Dr. Emily Rodriguez",
      treatment: "Vaccination",
      status: "scheduled",
      department: "Pediatrics",
    },
    {
      id: 4,
      time: "02:00 PM",
      patient: "Robert Johnson",
      doctor: "Dr. Michael Kim",
      treatment: "Physical Therapy",
      status: "scheduled",
      department: "Orthopedics",
    },
    {
      id: 5,
      time: "03:30 PM",
      patient: "Patricia Lee",
      doctor: "Dr. Lisa Patel",
      treatment: "X-Ray",
      status: "scheduled",
      department: "Radiology",
    },
    {
      id: 6,
      time: "04:45 PM",
      patient: "David Miller",
      doctor: "Dr. Sarah Chen",
      treatment: "Stress Test",
      status: "scheduled",
      department: "Cardiology",
    },
  ];

  const stats = {
    totalDoctors: 48,
    totalPatients: 847,
    todayAppointments: 24,
    emergencyCases: 3,
    occupancyRate: 78,
    averageWaitTime: "12 min",
  };

  return (
    <>
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"} p-8`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#2C3A4A]">
              Good morning, Admin
            </h1>
            <p className="text-[#6B7280] mt-1">
              Here&apos;s what&apos;s happening at MediCare today
            </p>
          </div>

          {/* Date & Search */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-[#9F7E69]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[#2C3A4A]">March 7, 2026</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-[#2C3A4A] placeholder-[#6B7280] w-48"
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
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            {
              label: "Total Doctors",
              value: stats.totalDoctors,
              icon: "👨‍⚕️",
              change: "+3",
              bg: "from-[#9F7E69]/20 to-[#7A8B99]/20",
            },
            {
              label: "Total Patients",
              value: stats.totalPatients,
              icon: "👤",
              change: "+28",
              bg: "from-[#6D8A7D]/20 to-[#7A8B99]/20",
            },
            {
              label: "Today's Appointments",
              value: stats.todayAppointments,
              icon: "📅",
              change: "+6",
              bg: "from-[#B48C6C]/20 to-[#C97C6D]/20",
            },
            {
              label: "Emergency Cases",
              value: stats.emergencyCases,
              icon: "🚑",
              change: "-2",
              bg: "from-[#C97C6D]/20 to-[#B48C6C]/20",
            },
            {
              label: "Occupancy Rate",
              value: `${stats.occupancyRate}%`,
              icon: "🏥",
              change: "+5%",
              bg: "from-[#7A8B99]/20 to-[#6D8A7D]/20",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span
                  className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-[#6D8A7D]" : "text-[#C97C6D]"}`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#2C3A4A]">
                {stat.value}
              </h3>
              <p className="text-sm text-[#6B7280]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Departments Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif text-[#2C3A4A]">
              🏥 Departments
            </h2>
            <Link
              href="#"
              className="text-[#9F7E69] hover:text-[#7A8B99] text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                  >
                    {dept.icon}
                  </div>
                  <span className="text-xs px-2 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full">
                    {dept.doctorCount + dept.patientCount} total
                  </span>
                </div>
                <h3 className="text-xl font-serif text-[#2C3A4A] mb-2">
                  {dept.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">
                    👨‍⚕️ {dept.doctorCount} Doctors
                  </span>
                  <span className="text-[#6B7280]">
                    👤 {dept.patientCount} Patients
                  </span>
                </div>
                <div className="mt-4 w-full bg-[#F5F1EB] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (dept.patientCount / 300) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctors and Patients Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Doctors List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-[#2C3A4A]">
                👨‍⚕️ Active Doctors
              </h2>
              <Link
                href="#"
                className="text-[#9F7E69] hover:text-[#7A8B99] text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center justify-between p-3 hover:bg-[#F5F1EB] rounded-xl transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-xl flex items-center justify-center text-white text-lg">
                      {doctor.image}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2C3A4A]">
                        {doctor.name}
                      </h4>
                      <p className="text-xs text-[#6B7280]">
                        {doctor.department} • {doctor.patients} patients
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-[#6B7280]">
                        {doctor.rating}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full
                      ${
                        doctor.status === "available"
                          ? "bg-[#6D8A7D]/20 text-[#6D8A7D]"
                          : doctor.status === "busy"
                            ? "bg-[#C97C6D]/20 text-[#C97C6D]"
                            : "bg-[#6B7280]/20 text-[#6B7280]"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patients List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-[#2C3A4A]">
                👤 Recent Patients
              </h2>
              <Link
                href="#"
                className="text-[#9F7E69] hover:text-[#7A8B99] text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-3 hover:bg-[#F5F1EB] rounded-xl transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#B48C6C] to-[#C97C6D] rounded-xl flex items-center justify-center text-white text-lg">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2C3A4A]">
                        {patient.name}
                      </h4>
                      <p className="text-xs text-[#6B7280]">
                        {patient.age} yrs • {patient.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B7280]">{patient.doctor}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full inline-block mt-1
                      ${patient.status === "active" ? "bg-[#6D8A7D]/20 text-[#6D8A7D]" : "bg-[#6B7280]/20 text-[#6B7280]"}`}
                    >
                      {patient.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Treatment History */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif text-[#2C3A4A]">
                📋 Today&apos;s Treatment History
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                March 7, 2026 • 6 scheduled treatments
              </p>
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl text-[#2C3A4A] text-sm focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E2D8]">
                  <th className="text-left py-4 text-sm font-medium text-[#6B7280]">
                    Time
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-[#6B7280]">
                    Patient
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-[#6B7280]">
                    Doctor
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-[#6B7280]">
                    Treatment
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-[#6B7280]">
                    Department
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-[#6B7280]">
                    Status
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-[#6B7280]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]">
                {todayTreatments
                  .filter(
                    (t) =>
                      selectedDepartment === "all" ||
                      t.department === selectedDepartment,
                  )
                  .map((treatment) => (
                    <tr
                      key={treatment.id}
                      className="hover:bg-[#F5F1EB] transition-colors"
                    >
                      <td className="py-4 text-[#2C3A4A] font-medium">
                        {treatment.time}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-lg flex items-center justify-center text-white text-xs">
                            {treatment.patient.charAt(0)}
                          </div>
                          <span className="text-[#2C3A4A]">
                            {treatment.patient}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-[#6B7280]">
                        {treatment.doctor}
                      </td>
                      <td className="py-4 text-[#2C3A4A]">
                        {treatment.treatment}
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full text-xs">
                          {treatment.department}
                        </span>
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          treatment.status === "completed"
                            ? "bg-[#6D8A7D]/20 text-[#6D8A7D]"
                            : treatment.status === "in-progress"
                              ? "bg-[#9F7E69]/20 text-[#9F7E69]"
                              : "bg-[#B48C6C]/20 text-[#B48C6C]"
                        }`}
                        >
                          {treatment.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-[#9F7E69] hover:text-[#7A8B99] transition-colors">
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow group">
            <svg
              className="w-6 h-6 group-hover:rotate-90 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
