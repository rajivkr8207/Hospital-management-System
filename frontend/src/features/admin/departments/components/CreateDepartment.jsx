import React, { useState } from "react";
import UseDepartment from "../hooks/UseDepartment";

const CreateDepartment = ({ setShowCreateModal }) => {
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    department_code: ""
  });
  const { handleCreateDepartment } = UseDepartment();
  const CreateDepartment = async (e) => {
    e.preventDefault();
    setShowCreateModal(false);
    await handleCreateDepartment(newDepartment);
    setNewDepartment({
      name: "",
      description: "",
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-[#2C3A4A]">
                Create New Department
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-[#F5F1EB] rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-[#6B7280]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={CreateDepartment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#2C3A4A]">
                    Department Name <span className="text-[#C97C6D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newDepartment.name}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                    placeholder="e.g., Cardiology"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#2C3A4A]">
                  department code <span className="text-[#C97C6D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newDepartment.department_code}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        department_code: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A]"
                    placeholder="e.g., Cardiology"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-[#2C3A4A]">
                    Description <span className="text-[#C97C6D]">*</span>
                  </label>
                  <textarea
                    required
                    value={newDepartment.description}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 bg-[#F5F1EB] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F7E69]/30 focus:border-[#9F7E69] text-[#2C3A4A] resize-none"
                    placeholder="Department description and specializations..."
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDepartment;
