import React from "react";
import { FaRegEye, FaTrash } from "react-icons/fa";

const DepartmentCard = ({ dept, setSelectedDepartment,handleDeleteDepartment }) => {
  return (
    <>
      <div
        key={dept.id}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
      >
        <div
          className={`p-6 bg-gradient-to-r from-red-300 to-blue-300 text-white`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div>
                  <h2 className="text-2xl font-serif">{dept.name}</h2>
                </div>
              </div>
              <p className="text-white/90 text-sm line-clamp-2">
                {dept.description}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}
            >
              {dept.department_code}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}
            >
              {dept.is_active ? "Active": "Closed"}
            </span>
          </div>
        </div>

        {/* Department Stats */}
        <div className="p-6">
        
          <div className="flex items-center justify-end space-x-2 mt-4 pt-4">
            <button
              onClick={() => setSelectedDepartment(dept)}
              className="p-2 text-[#6B7280] hover:text-[#9F7E69] hover:bg-[#F5F1EB] rounded-lg transition-colors"
            >
              <FaRegEye />
            </button>
            <button
              onClick={() => handleDeleteDepartment(dept._id)}
              className="p-2 text-[#6B7280] hover:text-[#C97C6D] hover:bg-[#F5F1EB] rounded-lg transition-colors"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentCard;
