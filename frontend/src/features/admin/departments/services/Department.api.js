const { default: api } = require("@/lib/api/axios");


export const CreateDepartment = async (data) => {
    const res = await api.post('/department', data)
    return res.data
}

export const GetAllDepartment = async () => {
    const res = await api.get('/department')
    return res.data
}

export const GetDepartmentById = async (id) => {
    const res = await api.get(`/department/${id}`)
    return res.data
}
export const UpdateDepartment = async (id, data) => {
    const res = await api.put(`/department/${id}`, data)
    return res.data
}
export const DeleteDepartment = async (id) => {
    const res = await api.delete(`/department/${id}`)
    return res.data
}