// app/admin/departments/page.tsx
"use client";

import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import CreateDepartment from "@/features/admin/departments/components/CreateDepartment";
import ShowDepartmentCard from "@/features/admin/departments/components/ShowDepartmentCard";
import { useAdmin } from "@/features/admin/context/AdminContext";
import { CiSearch } from "react-icons/ci";
import { FaRegEye, FaTrash } from "react-icons/fa";
import DepartmentCard from "@/features/admin/departments/components/DepartmentCard";
import UseDepartment from "@/features/admin/departments/hooks/UseDepartment";

const AdminDepartmentPage = () => {
  const {
    filterStatus,
    setFilterStatus,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    setShowCreateModal,
    departments,
    showCreateModal,
    searchTerm,
    loading,
    handleDeleteDepartment,
  } = UseDepartment();
const {sidebarCollapsed} = useAdmin()
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || dept.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"} p-8`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#2C3A4A]">
              🏥 Departments
            </h1>
            <p className="text-[#6B7280] mt-1">
              Manage hospital departments, view statistics, and create new
              departments
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
            >
              <GoPlus className="text-2xl" />
              <span>New Department</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🏥</span>
              <span className="text-sm text-[#6D8A7D]">+2 this month</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {departments?.length}
            </h3>
            <p className="text-sm text-[#6B7280]">Total Departments</p>
          </div>

          {/* <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">👨‍⚕️</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {departments.reduce((sum, dept) => sum + dept.doctorCount, 0)}
            </h3>
            <p className="text-sm text-[#6B7280]">Department Doctors</p>
          </div> */}

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📊</span>
              <span className="text-sm text-[#6D8A7D]">87% active</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {departments?.filter((d) => d.is_active === true).length}
            </h3>
            <p className="text-sm text-[#6B7280]">Active Departments</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm flex items-center w-64">
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-[#2C3A4A] placeholder-[#6B7280] w-full"
              />
              <CiSearch />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-[#E8E2D8] rounded-xl text-[#2C3A4A] focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">inActive</option>
            </select>
          </div>

          <div className="text-sm text-[#6B7280]">
            Showing {filteredDepartments.length} of {departments.length}{" "}
            departments
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept, idx) => (
            <DepartmentCard key={idx} dept={dept} setSelectedDepartment={setSelectedDepartment} handleDeleteDepartment={handleDeleteDepartment} />
          ))}
        </div>

        {/* Create Department Modal */}
        {showCreateModal && (
          <CreateDepartment setShowCreateModal={setShowCreateModal} />
        )}

        {/* View Department Modal */}
        {selectedDepartment && (
          <ShowDepartmentCard
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
        )}
      </div>
    </>
  );
};

export default AdminDepartmentPage;
