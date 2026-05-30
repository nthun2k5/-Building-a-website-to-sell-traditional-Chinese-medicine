import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from './apiResponse';

// 1. Tạo instance của Axios
export const apiInstance = axios.create({
    baseURL: 'http://' + import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_PREFIX,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Request Interceptor: Tự động chèn token trước khi gửi request
apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor: Xử lý lỗi toàn cục (Ví dụ: token hết hạn 401)
apiInstance.interceptors.response.use(
    (response) => response.data, // Trực tiếp trả về data thay vì cả đối tượng response
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                localStorage.removeItem('accessToken');
                // Có thể dùng window.location.href = '/login' hoặc chuyển hướng route
            }

            // Định nghĩa thông báo lỗi gọn gàng để UI dễ dùng
            const serverMessage = (error.response.data as any)?.message;
            return Promise.reject(new Error(serverMessage || `Lỗi từ server (${status})`));
        }

        return Promise.reject(new Error(error.message || 'Lỗi kết nối mạng.'));
    }
);

// 4. Đối tượng apiClient giúp gọi API ngắn gọn và hỗ trợ Generics cực tốt
export const apiClient = {
    get: <T extends ApiResponse<any>>(url: string, config?: any): Promise<T> => apiInstance.get(url, config),
    post: <T extends ApiResponse<any>>(url: string, data?: any, config?: any): Promise<T> => apiInstance.post(url, data, config),
    put: <T extends ApiResponse<any>>(url: string, data?: any, config?: any): Promise<T> => apiInstance.put(url, data, config),
    delete: <T extends ApiResponse<any>>(url: string, config?: any): Promise<T> => apiInstance.delete(url, config),
};