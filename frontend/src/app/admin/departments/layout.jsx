"use client";

import DepartmentProvider from "@/features/admin/departments/context/Department.context";

export default function Layout({ children }) {
  return (
    <>
      <DepartmentProvider>{children}</DepartmentProvider>
    </>
  );
}
