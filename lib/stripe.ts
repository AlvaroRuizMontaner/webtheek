import axios from "axios"

const apiStripe = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

apiStripe.interceptors.request.use((config) => {
    const token = localStorage.getItem("AUTH_TOKEN")
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default apiStripe