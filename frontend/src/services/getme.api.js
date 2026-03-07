import api from "@/lib/api/axios"


export const GetMeMiddleware = async () => {
    const data = await api.get('/auth/get-me')
    console.log(data)
    return data.user
}