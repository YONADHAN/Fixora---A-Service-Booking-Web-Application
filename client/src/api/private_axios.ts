import {ADMIN_ROUTES} from "@/constants/admin_route";
import {CUSTOMER_ROUTE} from "@/constants/customer_route";
import {VENDOR_ROUTE} from "@/constants/vendor_route";
import {adminLogout} from "@/store/slices/admin_slice";
import {customerLogout} from "@/store/slices/customer_slice";
import {vendorLogout} from "@/store/slices/vendor_slice";
import {store} from "@/store/store";
import axios, {AxiosError, type AxiosRequestConfig} from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
    baseURL: process.env.,
    withCredentials: true,
})

let isRefreshing = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {_retry?: boolean};
        console.log('originalReq',originalRequest)

        const urlPart = originalRequest?.url?.split("/")[1] || "";
        console.log(urlPart);
        let role: "admin" | "vendor" | "customer" | "" ;
        switch(urlPart) {
            case "customer":
                role = "customer";
                break;
            case "admin":
                role = "admin";
                break;
            case "vendor":
                role = "vendor";
                break;
            default: 
                role = "";
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if(!isRefreshing) {
                isRefreshing = true;

                const refreshEndpoint = 
                    role === "admin"? ADMIN_ROUTES.REFRESH_TOKEN: role === "customer"?CUSTOMER_ROUTE.REFRESH_TOKEN: role === "vendor"?VENDOR_ROUTE.REFRESH_TOKEN:"";

                try {
                    if(refreshEndpoint) {
                        await axiosInstance.post(refreshEndpoint);
                    }
                    isRefreshing = false;
                    return axiosInstance(originalRequest);
                }catch (refreshError) {
                    isRefreshing = false;
                    handleLogout(role);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);
const handleLogout = (role: string) => {
    switch (role) {
        case "customer":
            store.dispatch(customerLogout());
            window.location.href = "/";
            break;
        case "admin":
            store.dispatch(adminLogout());
            window.location.href = "/admin";
            break;
        case "vendor":
            store.dispatch(vendorLogout());
            window.location.href = "/vendor";
            break;
        default:
            window.location.href = "/";
    }
    toast("Please login again");
}