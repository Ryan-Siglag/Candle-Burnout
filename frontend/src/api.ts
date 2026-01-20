// import axios from "axios"
import axios, { type InternalAxiosRequestConfig } from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config):InternalAxiosRequestConfig => {
        console.log("Getting Token")
        const token = localStorage.getItem(ACCESS_TOKEN)
        console.log("Token "+ token)
        if (token) {
            console.log(`Bearer${token}`)
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => { 
        console.log("Error!")
        Promise.reject(error)
    }
)

export default api