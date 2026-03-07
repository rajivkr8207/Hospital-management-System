import React from 'react'

const ShowDepartmentCard = ({selectedDepartment,setSelectedDepartment }) => {
  return (
   <>
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full">
              <div
                className={`p-6 bg-gradient-to-r from-red-300 to-blue-300 text-white rounded-t-3xl`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h2 className="text-3xl font-serif">
                        {selectedDepartment.name}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDepartment(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
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
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-[#6B7280] mb-2">
                    Description
                  </h3>
                  <p className="text-[#2C3A4A]">
                    {selectedDepartment.description}
                  </p>
                </div>

                <div className="flex flex-col justify-center  gap-6">
                <div className="flex  gap-5">
                    <p className="text-sm text-[#6B7280]">Department code</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1
                      ${
                        selectedDepartment.status === "active"
                          ? "bg-[#6D8A7D]/20 text-[#6D8A7D]"
                          : selectedDepartment.status === "full"
                            ? "bg-[#C97C6D]/20 text-[#C97C6D]"
                            : "bg-[#9F7E69]/20 text-[#9F7E69]"
                      }`}
                    >
                      {selectedDepartment.department_code}
                    </span>
                  </div>
                  <div className="flex  gap-5">
                    <p className="text-sm text-[#6B7280]">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1
                      ${
                        selectedDepartment.status === "active"
                          ? "bg-[#6D8A7D]/20 text-[#6D8A7D]"
                          : selectedDepartment.status === "full"
                            ? "bg-[#C97C6D]/20 text-[#C97C6D]"
                            : "bg-[#9F7E69]/20 text-[#9F7E69]"
                      }`}
                    >
                      {selectedDepartment.is_active ? "Active" :"Closed"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E8E2D8]">
                  {/* <button
                    onClick={() => {
                      setSelectedDepartment(null);
                      // Here you would open edit modal
                    }}
                    className="px-6 py-3 bg-[#F5F1EB] text-[#2C3A4A] rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors"
                  >
                    Edit Department
                  </button> */}
                  <button
                    onClick={() => setSelectedDepartment(null)}
                    className="px-6 py-3 bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
   </>
  )
}

export default ShowDepartmentCard