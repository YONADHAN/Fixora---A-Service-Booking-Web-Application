import axios from 'axios'
export const authAxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api/v1/auth',
  withCredentials: true,
})
