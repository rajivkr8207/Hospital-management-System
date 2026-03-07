// import Sidebar from "@/components/admin/Sidebar";
// import Navbar from "@/components/admin/Navbar";

import AdminSideNavbar from "@/features/admin/components/AdminSideNavbar";
import { AdminProvider } from "@/features/admin/context/AdminContext";

export default function AdminLayout({ children }) {
  
  return (
    <AdminProvider>
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E8E2D8]">
      <AdminSideNavbar />
      {children}
    </div>
    </AdminProvider>
  );
}
