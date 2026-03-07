// components/Navbar.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'patient' or 'doctor'
  const [userData, setUserData] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  // Simulate auth check - In real app, this would come from your auth context/store
  useEffect(() => {
    // This is mock data - replace with actual auth logic
    const checkAuth = () => {
      // For demo purposes, let's say we're logged in as patient on /patient routes
      if (pathname?.startsWith("/patient")) {
        setIsLoggedIn(true);
        setUserType("patient");
        setUserData({
          name: "John Thompson",
          email: "john@email.com",
          image: "👤",
          id: "P12345",
        });
      }
      // Logged in as doctor on /doctor routes
      else if (pathname?.startsWith("/doctor")) {
        setIsLoggedIn(true);
        setUserType("doctor");
        setUserData({
          name: "Dr. Sarah Chen",
          email: "sarah.chen@medicare.com",
          image: "👩‍⚕️",
          id: "D12345",
          department: "Cardiology",
        });
      } else {
        setIsLoggedIn(false);
        setUserType(null);
        setUserData(null);
      }
    };

    checkAuth();
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null);
    setShowUserMenu(false);
    // Redirect to home
    window.location.href = "/";
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-light">+</span>
                </div>
                <span
                  className={`text-xl font-serif ${
                    scrolled ? "text-[#2C3A4A]" : "text-white"
                  }`}
                >
                  MediCare
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <NavLink href="/" scrolled={scrolled}>
                Home
              </NavLink>
              <NavLink href="/about" scrolled={scrolled}>
                About
              </NavLink>
              <NavLink href="/services" scrolled={scrolled}>
                Services
              </NavLink>
              <NavLink href="/contact" scrolled={scrolled}>
                Contact
              </NavLink>

              {/* Conditional Links based on user type */}
              {isLoggedIn && userType === "patient" && (
                <>
                  <NavLink href="/patient/dashboard" scrolled={scrolled}>
                    Dashboard
                  </NavLink>
                  <NavLink href="/patient/appointments" scrolled={scrolled}>
                    Appointments
                  </NavLink>
                  <NavLink href="/patient/records" scrolled={scrolled}>
                    Medical Records
                  </NavLink>
                </>
              )}

              {isLoggedIn && userType === "doctor" && (
                <>
                  <NavLink href="/doctor/dashboard" scrolled={scrolled}>
                    Dashboard
                  </NavLink>
                  <NavLink href="/doctor/patients" scrolled={scrolled}>
                    My Patients
                  </NavLink>
                  <NavLink href="/doctor/schedule" scrolled={scrolled}>
                    Schedule
                  </NavLink>
                </>
              )}
            </div>

            {/* Desktop Auth Buttons / User Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className={`px-5 py-2 rounded-xl font-medium transition-all ${
                      scrolled
                        ? "text-[#2C3A4A] hover:text-[#9F7E69] hover:bg-[#F5F1EB]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`px-5 py-2 rounded-xl font-medium transition-all ${
                      scrolled
                        ? "bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white hover:opacity-90"
                        : "bg-white text-[#2C3A4A] hover:bg-opacity-90"
                    }`}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div
                      className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all ${
                        scrolled ? "hover:bg-[#F5F1EB]" : "hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                          userType === "doctor"
                            ? "bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] text-white"
                            : "bg-gradient-to-br from-[#B48C6C] to-[#C97C6D] text-white"
                        }`}
                      >
                        {userData?.image || "👤"}
                      </div>
                      <div className="hidden lg:block text-left">
                        <p
                          className={`text-sm font-medium ${
                            scrolled ? "text-[#2C3A4A]" : "text-white"
                          }`}
                        >
                          {userData?.name}
                        </p>
                        <p
                          className={`text-xs ${
                            scrolled ? "text-[#6B7280]" : "text-white/70"
                          }`}
                        >
                          {userType === "doctor"
                            ? userData?.department
                            : "Patient"}
                        </p>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          showUserMenu ? "rotate-180" : ""
                        } ${scrolled ? "text-[#6B7280]" : "text-white"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E8E2D8] overflow-hidden animate-fadeIn">
                      <div className="p-4 bg-gradient-to-r from-[#9F7E69]/10 to-[#7A8B99]/10 border-b border-[#E8E2D8]">
                        <p className="text-sm font-medium text-[#2C3A4A]">
                          {userData?.name}
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          {userData?.email}
                        </p>
                        <p className="text-xs text-[#9F7E69] mt-1">
                          ID: {userData?.id}
                        </p>
                      </div>

                      <div className="p-2">
                        {userType === "patient" ? (
                          <>
                            <DropdownLink href="/patient/profile">
                              My Profile
                            </DropdownLink>
                            <DropdownLink href="/patient/appointments">
                              My Appointments
                            </DropdownLink>
                            <DropdownLink href="/patient/records">
                              Medical Records
                            </DropdownLink>
                            <DropdownLink href="/patient/prescriptions">
                              Prescriptions
                            </DropdownLink>
                            <DropdownLink href="/patient/billing">
                              Billing
                            </DropdownLink>
                          </>
                        ) : (
                          <>
                            <DropdownLink href="/doctor/profile">
                              My Profile
                            </DropdownLink>
                            <DropdownLink href="/doctor/schedule">
                              My Schedule
                            </DropdownLink>
                            <DropdownLink href="/doctor/patients">
                              Patient List
                            </DropdownLink>
                            <DropdownLink href="/doctor/appointments">
                              Appointments
                            </DropdownLink>
                            <DropdownLink href="/doctor/earnings">
                              Earnings
                            </DropdownLink>
                          </>
                        )}

                        <div className="border-t border-[#E8E2D8] my-2"></div>

                        <DropdownLink href="/settings">Settings</DropdownLink>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-[#C97C6D] hover:bg-[#F5F1EB] rounded-xl transition-colors flex items-center space-x-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-xl transition-colors ${
                  scrolled
                    ? "text-[#2C3A4A] hover:bg-[#F5F1EB]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-4 pt-2 pb-4 space-y-2 ${
              scrolled ? "bg-white" : "bg-[#2C3A4A]/90 backdrop-blur-md"
            }`}
          >
            {/* Mobile Navigation Links */}
            <MobileNavLink href="/" scrolled={scrolled}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" scrolled={scrolled}>
              About
            </MobileNavLink>
            <MobileNavLink href="/services" scrolled={scrolled}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/contact" scrolled={scrolled}>
              Contact
            </MobileNavLink>

            {isLoggedIn && userType === "patient" && (
              <>
                <div
                  className={`border-t my-2 ${scrolled ? "border-[#E8E2D8]" : "border-white/20"}`}
                ></div>
                <MobileNavLink href="/patient/dashboard" scrolled={scrolled}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink href="/patient/appointments" scrolled={scrolled}>
                  Appointments
                </MobileNavLink>
                <MobileNavLink href="/patient/records" scrolled={scrolled}>
                  Medical Records
                </MobileNavLink>
                <MobileNavLink
                  href="/patient/prescriptions"
                  scrolled={scrolled}
                >
                  Prescriptions
                </MobileNavLink>
                <MobileNavLink href="/patient/billing" scrolled={scrolled}>
                  Billing
                </MobileNavLink>
              </>
            )}

            {isLoggedIn && userType === "doctor" && (
              <>
                <div
                  className={`border-t my-2 ${scrolled ? "border-[#E8E2D8]" : "border-white/20"}`}
                ></div>
                <MobileNavLink href="/doctor/dashboard" scrolled={scrolled}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink href="/doctor/patients" scrolled={scrolled}>
                  My Patients
                </MobileNavLink>
                <MobileNavLink href="/doctor/schedule" scrolled={scrolled}>
                  Schedule
                </MobileNavLink>
                <MobileNavLink href="/doctor/appointments" scrolled={scrolled}>
                  Appointments
                </MobileNavLink>
                <MobileNavLink href="/doctor/earnings" scrolled={scrolled}>
                  Earnings
                </MobileNavLink>
              </>
            )}

            {/* Mobile Auth Section */}
            <div
              className={`border-t my-2 ${scrolled ? "border-[#E8E2D8]" : "border-white/20"}`}
            ></div>

            {!isLoggedIn ? (
              <div className="space-y-2 pt-2">
                <Link
                  href="/login"
                  className={`block w-full px-4 py-3 text-center rounded-xl font-medium transition-all ${
                    scrolled
                      ? "bg-[#F5F1EB] text-[#2C3A4A] hover:bg-[#E8E2D8]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`block w-full px-4 py-3 text-center rounded-xl font-medium transition-all ${
                    scrolled
                      ? "bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white"
                      : "bg-white text-[#2C3A4A]"
                  }`}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-2">
                {/* Mobile User Info */}
                <div
                  className={`p-4 rounded-xl mb-2 ${
                    scrolled ? "bg-[#F5F1EB]" : "bg-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        userType === "doctor"
                          ? "bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] text-white"
                          : "bg-gradient-to-br from-[#B48C6C] to-[#C97C6D] text-white"
                      }`}
                    >
                      {userData?.image || "👤"}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${scrolled ? "text-[#2C3A4A]" : "text-white"}`}
                      >
                        {userData?.name}
                      </p>
                      <p
                        className={`text-xs ${scrolled ? "text-[#6B7280]" : "text-white/70"}`}
                      >
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <MobileNavLink href="/settings" scrolled={scrolled}>
                  Settings
                </MobileNavLink>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                    scrolled
                      ? "text-[#C97C6D] hover:bg-[#F5F1EB]"
                      : "text-white hover:bg-white/10"
                  } flex items-center space-x-2`}
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, children, scrolled }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-all relative group ${
        scrolled
          ? isActive
            ? "text-[#9F7E69]"
            : "text-[#2C3A4A] hover:text-[#9F7E69]"
          : isActive
            ? "text-white"
            : "text-white/80 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform group-hover:scale-x-100 ${
          isActive ? "scale-x-100" : ""
        }`}
      ></span>
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ href, children, scrolled }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
        scrolled
          ? isActive
            ? "bg-gradient-to-r from-[#9F7E69]/20 to-[#7A8B99]/20 text-[#9F7E69]"
            : "text-[#2C3A4A] hover:bg-[#F5F1EB]"
          : isActive
            ? "bg-white/20 text-white"
            : "text-white/80 hover:bg-white/10"
      }`}
    >
      {children}
    </Link>
  );
};

// Dropdown Link Component
const DropdownLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-[#2C3A4A] hover:bg-[#F5F1EB] rounded-xl transition-colors"
    >
      {children}
    </Link>
  );
};

export default Navbar;
