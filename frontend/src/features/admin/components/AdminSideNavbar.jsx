"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "../context/AdminContext";
import { adminMenu } from "../config/adminMenu";
import { IoIosLogOut } from "react-icons/io";
import UseAuth from "@/features/auth/hooks/UseAuth";
const AdminSideNavbar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAdmin();
  const pathname = usePathname();
  const {handlelogout} = UseAuth()
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-sm shadow-2xl transition-all duration-300 z-20
      ${sidebarCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-[#E8E2D8]">
        <div
          className={`flex items-center ${
            sidebarCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-light">+</span>
          </div>

          {!sidebarCollapsed && (
            <span className="text-xl font-serif text-[#2C3A4A]">
              MediCare
            </span>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-16 bg-white rounded-full p-1.5 shadow-lg border border-[#E8E2D8]"
      >
        <svg
          className={`w-4 h-4 text-[#6B7280] transition-transform ${
            sidebarCollapsed ? "" : "rotate-180"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {adminMenu.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center ${
                sidebarCollapsed ? "justify-center" : "space-x-3"
              } px-4 py-3 rounded-xl transition-all
              
              ${
                active
                  ? "bg-gradient-to-r from-[#9F7E69]/20 to-[#7A8B99]/20 text-[#2C3A4A] border-l-4 border-[#9F7E69]"
                  : "text-[#6B7280] hover:bg-[#F5F1EB]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              {!sidebarCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E8E2D8]">
        <div
          className={`flex items-center justify-between px-2 ${
            sidebarCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-xl flex items-center justify-center text-white">
            A
          </div>

          {!sidebarCollapsed && (
            <div>
              <p className="text-sm font-medium text-[#2C3A4A]">
                Admin User
              </p>
              <p className="text-xs text-[#6B7280]">
                admin@medicare.com
              </p>
            </div>
          )}
          <div onClick={()=>handlelogout()}>
          <IoIosLogOut className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideNavbar;