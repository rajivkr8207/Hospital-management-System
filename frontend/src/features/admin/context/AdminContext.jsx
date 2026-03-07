"use client";

import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AdminContext.Provider
      value={{ sidebarCollapsed, setSidebarCollapsed }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);