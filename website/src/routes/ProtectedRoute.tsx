import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
    const token = localStorage.getItem('accessToken');
    const location = useLocation();

    if (!token) {
        // Chuyển hướng về trang login, đồng thời lưu lại trang họ định truy cập
        // thông qua state để sau khi login thành công có thể quay lại
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Nếu đã có token, cho phép tiếp tục đi tới các trang con bên trong
    return <Outlet />;
}
