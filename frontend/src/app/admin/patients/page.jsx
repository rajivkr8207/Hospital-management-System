// app/admin/patients/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Patients = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock Patients Data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Thompson',
      email: 'john.thompson@email.com',
      phone: '+1 (555) 123-4567',
      age: 45,
      gender: 'Male',
      bloodGroup: 'O+',
      dob: '1981-03-15',
      address: '123 Main St, Apt 4B, Boston, MA 02115',
      emergencyContact: '+1 (555) 987-6543',
      emergencyName: 'Mary Thompson',
      
      // Medical Info
      department: 'Cardiology',
      doctorId: 1,
      doctorName: 'Dr. Sarah Chen',
      admissionDate: '2026-03-01',
      dischargeDate: null,
      status: 'active',
      bedNumber: '301A',
      
      // History
      totalVisits: 12,
      lastVisit: '2026-03-06',
      nextAppointment: '2026-03-15',
      
      // Insurance
      insuranceProvider: 'Blue Cross',
      insuranceId: 'BC123456789',
      
      // Vitals
      bloodPressure: '120/80',
      heartRate: 72,
      temperature: '98.6',
      weight: 82,
      height: 180,
      
      // Additional
      allergies: ['Penicillin', 'Peanuts'],
      chronicConditions: ['Hypertension'],
      image: '👤'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 234-5678',
      age: 32,
      gender: 'Female',
      bloodGroup: 'A+',
      dob: '1994-07-22',
      address: '456 Oak Avenue, Apt 12, New York, NY 10019',
      emergencyContact: '+1 (555) 876-5432',
      emergencyName: 'Carlos Garcia',
      
      department: 'Neurology',
      doctorId: 2,
      doctorName: 'Dr. James Wilson',
      admissionDate: '2026-03-05',
      dischargeDate: null,
      status: 'active',
      bedNumber: '405B',
      
      totalVisits: 5,
      lastVisit: '2026-03-06',
      nextAppointment: '2026-03-20',
      
      insuranceProvider: 'Aetna',
      insuranceId: 'AE987654321',
      
      bloodPressure: '118/75',
      heartRate: 68,
      temperature: '98.4',
      weight: 58,
      height: 162,
      
      allergies: ['Sulfa'],
      chronicConditions: ['Migraine'],
      image: '👤'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@email.com',
      phone: '+1 (555) 345-6789',
      age: 58,
      gender: 'Male',
      bloodGroup: 'B-',
      dob: '1968-11-30',
      address: '789 Pine Street, Chicago, IL 60611',
      emergencyContact: '+1 (555) 765-4321',
      emergencyName: 'Susan Johnson',
      
      department: 'Orthopedics',
      doctorId: 4,
      doctorName: 'Dr. Michael Kim',
      admissionDate: '2026-02-25',
      dischargeDate: '2026-03-05',
      status: 'discharged',
      bedNumber: '202C',
      
      totalVisits: 8,
      lastVisit: '2026-03-05',
      nextAppointment: '2026-04-05',
      
      insuranceProvider: 'UnitedHealth',
      insuranceId: 'UH456789123',
      
      bloodPressure: '130/85',
      heartRate: 76,
      temperature: '98.7',
      weight: 92,
      height: 185,
      
      allergies: [],
      chronicConditions: ['Arthritis', 'Diabetes Type 2'],
      image: '👤'
    },
    {
      id: 4,
      name: 'Patricia Lee',
      email: 'patricia.lee@email.com',
      phone: '+1 (555) 456-7890',
      age: 27,
      gender: 'Female',
      bloodGroup: 'AB+',
      dob: '1999-05-18',
      address: '321 Cedar Road, Los Angeles, CA 90027',
      emergencyContact: '+1 (555) 654-3210',
      emergencyName: 'David Lee',
      
      department: 'Pediatrics',
      doctorId: 3,
      doctorName: 'Dr. Emily Rodriguez',
      admissionDate: '2026-03-06',
      dischargeDate: null,
      status: 'active',
      bedNumber: '110D',
      
      totalVisits: 3,
      lastVisit: '2026-03-06',
      nextAppointment: '2026-03-25',
      
      insuranceProvider: 'Kaiser',
      insuranceId: 'KP789123456',
      
      bloodPressure: '110/70',
      heartRate: 65,
      temperature: '98.2',
      weight: 63,
      height: 168,
      
      allergies: ['Latex'],
      chronicConditions: ['Asthma'],
      image: '👤'
    },
    {
      id: 5,
      name: 'David Miller',
      email: 'david.miller@email.com',
      phone: '+1 (555) 567-8901',
      age: 62,
      gender: 'Male',
      bloodGroup: 'A-',
      dob: '1964-09-12',
      address: '654 Elm Street, Houston, TX 77030',
      emergencyContact: '+1 (555) 543-2109',
      emergencyName: 'Carol Miller',
      
      department: 'Cardiology',
      doctorId: 1,
      doctorName: 'Dr. Sarah Chen',
      admissionDate: '2026-03-02',
      dischargeDate: null,
      status: 'active',
      bedNumber: '308E',
      
      totalVisits: 15,
      lastVisit: '2026-03-04',
      nextAppointment: '2026-03-18',
      
      insuranceProvider: 'Cigna',
      insuranceId: 'CG321654987',
      
      bloodPressure: '145/95',
      heartRate: 82,
      temperature: '98.8',
      weight: 88,
      height: 175,
      
      allergies: ['Codeine'],
      chronicConditions: ['Hypertension', 'CAD'],
      image: '👤'
    },
    {
      id: 6,
      name: 'Emma Watson',
      email: 'emma.watson@email.com',
      phone: '+1 (555) 678-9012',
      age: 35,
      gender: 'Female',
      bloodGroup: 'O-',
      dob: '1991-02-28',
      address: '987 Maple Drive, Miami, FL 33101',
      emergencyContact: '+1 (555) 432-1098',
      emergencyName: 'James Watson',
      
      department: 'Radiology',
      doctorId: 5,
      doctorName: 'Dr. Lisa Patel',
      admissionDate: '2026-03-06',
      dischargeDate: null,
      status: 'active',
      bedNumber: '502F',
      
      totalVisits: 2,
      lastVisit: '2026-03-06',
      nextAppointment: '2026-03-22',
      
      insuranceProvider: 'Medicare',
      insuranceId: 'MC654321987',
      
      bloodPressure: '122/78',
      heartRate: 70,
      temperature: '98.5',
      weight: 68,
      height: 170,
      
      allergies: [],
      chronicConditions: [],
      image: '👤'
    },
    {
      id: 7,
      name: 'William Brown',
      email: 'william.brown@email.com',
      phone: '+1 (555) 789-0123',
      age: 71,
      gender: 'Male',
      bloodGroup: 'B+',
      dob: '1955-08-05',
      address: '147 Birch Lane, Seattle, WA 98101',
      emergencyContact: '+1 (555) 321-0987',
      emergencyName: 'Elizabeth Brown',
      
      department: 'Oncology',
      doctorId: 7,
      doctorName: 'Dr. Maria Garcia',
      admissionDate: '2026-02-28',
      dischargeDate: null,
      status: 'active',
      bedNumber: '601G',
      
      totalVisits: 9,
      lastVisit: '2026-03-03',
      nextAppointment: '2026-03-17',
      
      insuranceProvider: 'AARP',
      insuranceId: 'AA147258369',
      
      bloodPressure: '138/88',
      heartRate: 74,
      temperature: '98.9',
      weight: 76,
      height: 172,
      
      allergies: ['Morphine'],
      chronicConditions: ['Cancer', 'COPD'],
      image: '👤'
    },
    {
      id: 8,
      name: 'Sophia Taylor',
      email: 'sophia.taylor@email.com',
      phone: '+1 (555) 890-1234',
      age: 19,
      gender: 'Female',
      bloodGroup: 'AB-',
      dob: '2007-06-10',
      address: '258 Willow Way, Denver, CO 80201',
      emergencyContact: '+1 (555) 210-9876',
      emergencyName: 'Michael Taylor',
      
      department: 'Pediatrics',
      doctorId: 3,
      doctorName: 'Dr. Emily Rodriguez',
      admissionDate: '2026-03-04',
      dischargeDate: null,
      status: 'active',
      bedNumber: '112H',
      
      totalVisits: 1,
      lastVisit: '2026-03-06',
      nextAppointment: '2026-03-30',
      
      insuranceProvider: 'UnitedHealth',
      insuranceId: 'UH369258147',
      
      bloodPressure: '115/72',
      heartRate: 68,
      temperature: '98.4',
      weight: 55,
      height: 165,
      
      allergies: ['Amoxicillin'],
      chronicConditions: ['Eczema'],
      image: '👤'
    }
  ]);

  // Mock Departments for filter
  const departments = [
    'All Departments',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Radiology',
    'Emergency',
    'Oncology',
    'Cardiology ICU'
  ];

  // Add Patient Form State
  const [newPatient, setNewPatient] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    dob: '',
    address: '',
    emergencyContact: '',
    emergencyName: '',
    
    // Medical Info
    department: '',
    doctorName: '',
    insuranceProvider: '',
    insuranceId: '',
    
    // Vitals
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    weight: '',
    height: '',
    
    // Additional
    allergies: '',
    chronicConditions: ''
  });

  // Admit Patient Form State
  const [admitData, setAdmitData] = useState({
    patientId: '',
    patientName: '',
    department: '',
    doctorName: '',
    bedNumber: '',
    admissionReason: '',
    admissionNotes: ''
  });

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         (patient.doctorName && patient.doctorName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = filterDepartment === 'all' || patient.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle Add Patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    
    const newId = patients.length + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const patient = {
      id: newId,
      name: newPatient.name,
      email: newPatient.email,
      phone: newPatient.phone,
      age: parseInt(newPatient.age) || 0,
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      dob: newPatient.dob,
      address: newPatient.address,
      emergencyContact: newPatient.emergencyContact,
      emergencyName: newPatient.emergencyName,
      
      department: newPatient.department,
      doctorName: newPatient.doctorName,
      admissionDate: null,
      dischargeDate: null,
      status: 'outpatient',
      bedNumber: null,
      
      totalVisits: 0,
      lastVisit: null,
      nextAppointment: null,
      
      insuranceProvider: newPatient.insuranceProvider,
      insuranceId: newPatient.insuranceId,
      
      bloodPressure: newPatient.bloodPressure,
      heartRate: parseInt(newPatient.heartRate) || 0,
      temperature: newPatient.temperature,
      weight: parseInt(newPatient.weight) || 0,
      height: parseInt(newPatient.height) || 0,
      
      allergies: newPatient.allergies ? newPatient.allergies.split(',').map(a => a.trim()) : [],
      chronicConditions: newPatient.chronicConditions ? newPatient.chronicConditions.split(',').map(c => c.trim()) : [],
      image: newPatient.gender === 'Male' ? '👨' : '👩'
    };

    setPatients([...patients, patient]);
    setShowAddModal(false);
    setNewPatient({
      name: '', email: '', phone: '', age: '', gender: '', bloodGroup: '', dob: '',
      address: '', emergencyContact: '', emergencyName: '', department: '', doctorName: '',
      insuranceProvider: '', insuranceId: '', bloodPressure: '', heartRate: '',
      temperature: '', weight: '', height: '', allergies: '', chronicConditions: ''
    });
    alert(`Patient ${patient.name} registered successfully!`);
  };

  // Handle Admit Patient
  const handleAdmitPatient = (e) => {
    e.preventDefault();
    
    // Find patient and update status
    const updatedPatients = patients.map(patient => {
      if (patient.id === parseInt(admitData.patientId)) {
        return {
          ...patient,
          status: 'active',
          admissionDate: new Date().toISOString().split('T')[0],
          department: admitData.department,
          doctorName: admitData.doctorName,
          bedNumber: admitData.bedNumber,
          totalVisits: patient.totalVisits + 1,
          lastVisit: new Date().toISOString().split('T')[0]
        };
      }
      return patient;
    });
    
    setPatients(updatedPatients);
    setShowAdmitModal(false);
    setAdmitData({
      patientId: '', patientName: '', department: '', doctorName: '',
      bedNumber: '', admissionReason: '', admissionNotes: ''
    });
    alert(`Patient admitted successfully!`);
  };

  // Handle Delete Patient
  const handleDeletePatient = (id) => {
    if (confirm('Are you sure you want to remove this patient from the system?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  // Handle Discharge Patient
  const handleDischargePatient = (id) => {
    if (confirm('Confirm patient discharge?')) {
      const updatedPatients = patients.map(patient => {
        if (patient.id === id) {
          return {
            ...patient,
            status: 'discharged',
            dischargeDate: new Date().toISOString().split('T')[0]
          };
        }
        return patient;
      });
      setPatients(updatedPatients);
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-[#6D8A7D]/20 text-[#6D8A7D]';
      case 'discharged': return 'bg-[#6B7280]/20 text-[#6B7280]';
      case 'outpatient': return 'bg-[#9F7E69]/20 text-[#9F7E69]';
      default: return 'bg-[#6B7280]/20 text-[#6B7280]';
    }
  };

  return (
      <>
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} p-8`}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#2C3A4A]">👤 Patient Management</h1>
            <p className="text-[#6B7280] mt-1">Manage patient records, admissions, and medical history</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowAdmitModal(true)}
              className="bg-white/90 backdrop-blur-sm text-[#2C3A4A] border border-[#9F7E69]/30 px-6 py-3 rounded-xl font-medium hover:bg-[#F5F1EB] transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Admit Patient</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">👥</span>
              <span className="text-sm text-[#6D8A7D]">+12 this month</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">{patients.length}</h3>
            <p className="text-sm text-[#6B7280]">Total Patients</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🛏️</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">{patients.filter(p => p.status === 'active').length}</h3>
            <p className="text-sm text-[#6B7280]">Admitted</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🚶</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">{patients.filter(p => p.status === 'outpatient').length}</h3>
            <p className="text-sm text-[#6B7280]">Outpatients</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">
              {patients.reduce((sum, p) => sum + p.totalVisits, 0)}
            </h3>
            <p className="text-sm text-[#6B7280]">Total Visits</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3A4A]">{patients.filter(p => p.status === 'discharged').length}</h3>
            <p className="text-sm text-[#6B7280]">Discharged</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm flex items-center w-64">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-[#2C3A4A] placeholder-[#6B7280] w-full"
              />
              <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-[#E8E2D8] rounded-xl text-[#2C3A4A] focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
            >
              <option value="all">All Departments</option>
              {departments.slice(1).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-[#E8E2D8] rounded-xl text-[#2C3A4A] focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
            >
              <option value="all">All Status</option>
              <option value="active">Admitted</option>
              <option value="outpatient">Outpatient</option>
              <option value="discharged">Discharged</option>
            </select>
          </div>
          
          <div className="text-sm text-[#6B7280]">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
              {/* Patient Header with Gradient */}
              <div className="h-20 bg-gradient-to-r from-[#9F7E69]/30 to-[#7A8B99]/30 relative">
                <div className="absolute -bottom-8 left-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-xl flex items-center justify-center text-3xl text-white shadow-lg border-2 border-white">
                    {patient.image}
                  </div>
                </div>
                
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>
              </div>

              {/* Patient Info */}
              <div className="pt-10 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-lg font-serif text-[#2C3A4A]">{patient.name}</h2>
                    <p className="text-xs text-[#6B7280]">{patient.age} yrs • {patient.gender} • {patient.bloodGroup}</p>
                  </div>
                </div>

                {/* Department & Doctor */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full">
                    {patient.department}
                  </span>
                  <span className="text-xs px-2 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full">
                    {patient.doctorName}
                  </span>
                  {patient.bedNumber && (
                    <span className="text-xs px-2 py-1 bg-[#F5F1EB] text-[#6B7280] rounded-full">
                      Bed: {patient.bedNumber}
                    </span>
                  )}
                </div>

                {/* Vitals */}
                <div className="grid grid-cols-4 gap-1 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280]">BP</p>
                    <p className="text-sm font-medium text-[#2C3A4A]">{patient.bloodPressure}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280]">HR</p>
                    <p className="text-sm font-medium text-[#2C3A4A]">{patient.heartRate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280]">Temp</p>
                    <p className="text-sm font-medium text-[#2C3A4A]">{patient.temperature}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280]">Visits</p>
                    <p className="text-sm font-medium text-[#2C3A4A]">{patient.totalVisits}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1 text-xs border-t border-[#E8E2D8] pt-2">
                  <div className="flex items-center text-[#6B7280]">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[#2C3A4A] truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center text-[#6B7280]">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-[#2C3A4A]">{patient.phone}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-1 mt-2 pt-2 border-t border-[#E8E2D8]">
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="p-1.5 text-[#6B7280] hover:text-[#9F7E69] hover:bg-[#F5F1EB] rounded-lg transition-colors"
                    title="View Details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  
                  {patient.status === 'active' && (
                    <button
                      onClick={() => handleDischargePatient(patient.id)}
                      className="p-1.5 text-[#6B7280] hover:text-[#6D8A7D] hover:bg-[#F5F1EB] rounded-lg transition-colors"
                      title="Discharge Patient"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.location.href = `mailto:${patient.email}`}
                    className="p-1.5 text-[#6B7280] hover:text-[#6D8A7D] hover:bg-[#F5F1EB] rounded-lg transition-colors"
                    title="Send Email"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="p-1.5 text-[#6B7280] hover:text-[#C97C6D] hover:bg-[#F5F1EB] rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full my-8">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#2C3A4A]">Register New Patient</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-[#F5F1EB] rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddPatient} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Personal Information */}
                    <div className="md:col-span-3">
                      <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Personal Information</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Email *</label>
                      <input
                        type="email"
                        required
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="john@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Age</label>
                      <input
                        type="number"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="45"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Gender</label>
                      <select
                        value={newPatient.gender}
                        onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Blood Group</label>
                      <select
                        value={newPatient.bloodGroup}
                        onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                      >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Date of Birth</label>
                      <input
                        type="date"
                        value={newPatient.dob}
                        onChange={(e) => setNewPatient({...newPatient, dob: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Address</label>
                      <input
                        type="text"
                        value={newPatient.address}
                        onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="123 Main St, City, State"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Emergency Contact Name</label>
                      <input
                        type="text"
                        value={newPatient.emergencyName}
                        onChange={(e) => setNewPatient({...newPatient, emergencyName: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="Emergency Contact"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Emergency Contact Number</label>
                      <input
                        type="text"
                        value={newPatient.emergencyContact}
                        onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    {/* Medical Information */}
                    <div className="md:col-span-3 mt-4">
                      <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Medical Information</h3>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Department</label>
                      <select
                        value={newPatient.department}
                        onChange={(e) => setNewPatient({...newPatient, department: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                      >
                        <option value="">Select</option>
                        {departments.slice(1).map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Doctor Name</label>
                      <input
                        type="text"
                        value={newPatient.doctorName}
                        onChange={(e) => setNewPatient({...newPatient, doctorName: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="Dr. Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Insurance Provider</label>
                      <input
                        type="text"
                        value={newPatient.insuranceProvider}
                        onChange={(e) => setNewPatient({...newPatient, insuranceProvider: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="Insurance Company"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Insurance ID</label>
                      <input
                        type="text"
                        value={newPatient.insuranceId}
                        onChange={(e) => setNewPatient({...newPatient, insuranceId: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="ID Number"
                      />
                    </div>

                    {/* Vitals */}
                    <div className="md:col-span-3 mt-4">
                      <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Vitals (Optional)</h3>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Blood Pressure</label>
                      <input
                        type="text"
                        value={newPatient.bloodPressure}
                        onChange={(e) => setNewPatient({...newPatient, bloodPressure: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="120/80"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Heart Rate</label>
                      <input
                        type="number"
                        value={newPatient.heartRate}
                        onChange={(e) => setNewPatient({...newPatient, heartRate: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="72"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Temperature</label>
                      <input
                        type="text"
                        value={newPatient.temperature}
                        onChange={(e) => setNewPatient({...newPatient, temperature: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="98.6"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Weight (kg)</label>
                      <input
                        type="number"
                        value={newPatient.weight}
                        onChange={(e) => setNewPatient({...newPatient, weight: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="70"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Height (cm)</label>
                      <input
                        type="number"
                        value={newPatient.height}
                        onChange={(e) => setNewPatient({...newPatient, height: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="170"
                      />
                    </div>

                    {/* Additional */}
                    <div className="md:col-span-3 mt-4">
                      <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Additional Information</h3>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Allergies (comma separated)</label>
                      <input
                        type="text"
                        value={newPatient.allergies}
                        onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="Penicillin, Peanuts, Latex"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Chronic Conditions</label>
                      <input
                        type="text"
                        value={newPatient.chronicConditions}
                        onChange={(e) => setNewPatient({...newPatient, chronicConditions: e.target.value})}
                        className="w-full px-4 py-2 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="Hypertension, Diabetes, Asthma"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E8E2D8]">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-2 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Register Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Admit Patient Modal */}
        {showAdmitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#2C3A4A]">Admit Patient</h2>
                  <button
                    onClick={() => setShowAdmitModal(false)}
                    className="p-2 hover:bg-[#F5F1EB] rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAdmitPatient} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">Select Patient *</label>
                    <select
                      required
                      value={admitData.patientId}
                      onChange={(e) => {
                        const patient = patients.find(p => p.id === parseInt(e.target.value));
                        setAdmitData({
                          ...admitData,
                          patientId: e.target.value,
                          patientName: patient?.name || '',
                          department: patient?.department || ''
                        });
                      }}
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                    >
                      <option value="">Select Patient</option>
                      {patients.filter(p => p.status !== 'active').map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} - {patient.department} ({patient.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Department *</label>
                      <select
                        required
                        value={admitData.department}
                        onChange={(e) => setAdmitData({...admitData, department: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                      >
                        <option value="">Select</option>
                        {departments.slice(1).map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Doctor *</label>
                      <input
                        type="text"
                        required
                        value={admitData.doctorName}
                        onChange={(e) => setAdmitData({...admitData, doctorName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="Dr. Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Bed Number *</label>
                      <input
                        type="text"
                        required
                        value={admitData.bedNumber}
                        onChange={(e) => setAdmitData({...admitData, bedNumber: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="301A"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#2C3A4A]">Admission Reason *</label>
                      <input
                        type="text"
                        required
                        value={admitData.admissionReason}
                        onChange={(e) => setAdmitData({...admitData, admissionReason: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30"
                        placeholder="Chest pain"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#2C3A4A]">Additional Notes</label>
                    <textarea
                      value={admitData.admissionNotes}
                      onChange={(e) => setAdmitData({...admitData, admissionNotes: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 resize-none"
                      placeholder="Any additional information..."
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E8E2D8]">
                    <button
                      type="button"
                      onClick={() => setShowAdmitModal(false)}
                      className="px-6 py-2 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Admit Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Patient Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full my-8">
              {/* Header with Gradient */}
              <div className="p-8 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-t-3xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl">
                      {selectedPatient.image}
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif">{selectedPatient.name}</h2>
                      <p className="text-white/90 text-lg">{selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.bloodGroup}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                          {selectedPatient.status}
                        </span>
                        {selectedPatient.bedNumber && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                            Bed: {selectedPatient.bedNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#F5F1EB] p-4 rounded-xl">
                    <p className="text-sm text-[#6B7280]">Department</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">{selectedPatient.department}</p>
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl">
                    <p className="text-sm text-[#6B7280]">Doctor</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">{selectedPatient.doctorName}</p>
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl">
                    <p className="text-sm text-[#6B7280]">Total Visits</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">{selectedPatient.totalVisits}</p>
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl">
                    <p className="text-sm text-[#6B7280]">Last Visit</p>
                    <p className="text-lg font-bold text-[#2C3A4A]">{selectedPatient.lastVisit || 'N/A'}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#6B7280]">Email</p>
                      <p className="text-[#2C3A4A]">{selectedPatient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Phone</p>
                      <p className="text-[#2C3A4A]">{selectedPatient.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Emergency Contact</p>
                      <p className="text-[#2C3A4A]">{selectedPatient.emergencyName} - {selectedPatient.emergencyContact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Address</p>
                      <p className="text-[#2C3A4A]">{selectedPatient.address}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Medical Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-[#6B7280]">Blood Pressure</p>
                      <p className="text-lg font-bold text-[#2C3A4A]">{selectedPatient.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Heart Rate</p>
                      <p className="text-lg font-bold text-[#2C3A4A]">{selectedPatient.heartRate} bpm</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Temperature</p>
                      <p className="text-lg font-bold text-[#2C3A4A]">{selectedPatient.temperature}°F</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">BMI</p>
                      <p className="text-lg font-bold text-[#2C3A4A]">
                        {selectedPatient.weight && selectedPatient.height ? 
                          (selectedPatient.weight / ((selectedPatient.height/100) ** 2)).toFixed(1) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Insurance */}
                <div>
                  <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Insurance Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#6B7280]">Provider</p>
                      <p className="text-[#2C3A4A]">{selectedPatient.insuranceProvider || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Policy ID</p>
                      <p className="text-[#2C3A4A]">{selectedPatient.insuranceId || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Allergies & Conditions */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Allergies</h3>
                    {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.allergies.map((allergy, index) => (
                          <span key={index} className="px-3 py-1 bg-[#F5F1EB] text-[#C97C6D] rounded-full text-sm">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#6B7280]">No known allergies</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Chronic Conditions</h3>
                    {selectedPatient.chronicConditions && selectedPatient.chronicConditions.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.chronicConditions.map((condition, index) => (
                          <span key={index} className="px-3 py-1 bg-[#F5F1EB] text-[#6D8A7D] rounded-full text-sm">
                            {condition}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#6B7280]">No chronic conditions</p>
                    )}
                  </div>
                </div>

                {/* Admission History */}
                <div>
                  <h3 className="text-lg font-serif text-[#2C3A4A] mb-3">Admission History</h3>
                  <div className="bg-[#F5F1EB] p-4 rounded-xl">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-[#6B7280]">Admission Date</p>
                        <p className="font-bold text-[#2C3A4A]">{selectedPatient.admissionDate || 'Not admitted'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280]">Discharge Date</p>
                        <p className="font-bold text-[#2C3A4A]">{selectedPatient.dischargeDate || 'Active'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280]">Next Appointment</p>
                        <p className="font-bold text-[#2C3A4A]">{selectedPatient.nextAppointment || 'Not scheduled'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-8 border-t border-[#E8E2D8] flex items-center justify-end space-x-4">
                <button
                  onClick={() => window.location.href = `mailto:${selectedPatient.email}`}
                  className="px-6 py-2 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                >
                  Send Email
                </button>
                {selectedPatient.status === 'active' && (
                  <button
                    onClick={() => {
                      handleDischargePatient(selectedPatient.id);
                      setSelectedPatient(null);
                    }}
                    className="px-6 py-2 bg-[#C97C6D]/20 text-[#C97C6D] rounded-xl font-medium hover:bg-[#C97C6D]/30 transition-colors"
                  >
                    Discharge Patient
                  </button>
                )}
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="px-6 py-2 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </>
  );
};

export default Patients;