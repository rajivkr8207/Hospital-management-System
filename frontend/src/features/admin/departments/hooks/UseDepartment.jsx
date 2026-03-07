import { useContext } from "react";
import { DepartmentContext } from "../context/Department.context";
import {
  CreateDepartment,
  DeleteDepartment,
  UpdateDepartment,
} from "../services/Department.api";
import { toast } from "react-toastify";

const UseDepartment = () => {
  const context = useContext(DepartmentContext);
  const {
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
  } = context;

  const handleCreateDepartment = async (data) => {
    setLoading(true);
    try {
      const res = await CreateDepartment(data);
      toast.success(res.message);
      FetchallDepartment();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDepartment = async (id, data) => {
    setLoading(true);
    try {
      const res = await UpdateDepartment(id, data);
      toast.success(res.message);
      FetchallDepartment();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDepartment = async (id) => {
    setLoading(true);
    try {
      const res = await DeleteDepartment(id);
      toast.success(res.message);
      FetchallDepartment();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    handleCreateDepartment,
    handleUpdateDepartment,
    handleDeleteDepartment,
  };
};

export default UseDepartment;
