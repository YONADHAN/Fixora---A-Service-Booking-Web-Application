import axios from 'axios'
export const authAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth',
  withCredentials: true,
})

console.log('env', process.env.NEXT_PUBLIC_BACKEND_URL)
