import { createContext, useEffect, useState } from "react";
import { GetAllDepartment } from "../services/Department.api";

export const DepartmentContext = createContext();

const DepartmentProvider = ({ children }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  async function FetchallDepartment() {
    setLoading(true);
    try {
      const res = await GetAllDepartment();
      setDepartments(res.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchallDepartment();
  }, []);

  return (
    <DepartmentContext.Provider
      value={{
        filterStatus,
        setFilterStatus,
        setSearchTerm,
        selectedDepartment,
        setSelectedDepartment,
        setShowCreateModal,
        departments,
        showCreateModal,
        setDepartments,
        searchTerm,
        loading,
        setLoading,
        FetchallDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentProvider;
