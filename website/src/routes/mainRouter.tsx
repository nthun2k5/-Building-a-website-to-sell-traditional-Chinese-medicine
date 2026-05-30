import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../shared/components/layouts/MainLayout';
import HomeView from '../features/home/HomeView';
import ProductView from '../features/products/ProductView';
import CartView from '../features/cart/CartView';
import LoginView from '../features/auth/LoginView';
import RegisterView from '../features/auth/RegisterView';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomeView />,
            },
            {
                path: 'products',
                element: <ProductView />,
            },
            
            // 🔒 NHÓM CÁC ROUTE BẮT BUỘC ĐĂNG NHẬP (Phải có token)
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'cart',
                        element: <CartView />,
                    },
                    // Bạn có thể thêm các trang như: checkout, profile, orders tại đây...
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <LoginView />,
    },
    {
        path: '/register',
        element: <RegisterView />,
    }
]);

export default router;
