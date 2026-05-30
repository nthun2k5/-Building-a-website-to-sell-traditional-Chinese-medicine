import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Login credentials:', { email, password });
        alert('Chức năng đăng nhập đang được cập nhật!');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl max-w-md w-full p-8 space-y-6 relative overflow-hidden">
                {/* Background accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -z-10"></div>

                <div className="text-center space-y-2">
                    <span className="text-3xl">🌿</span>
                    <h2 className="text-2xl font-extrabold text-stone-900">Đăng Nhập Đông Y Đường</h2>
                    <p className="text-stone-500 text-sm">Chào mừng bạn quay trở lại với chúng tôi</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block">Email / Số Điện Thoại</label>
                        <input
                            type="text"
                            required
                            placeholder="Nhập email hoặc số điện thoại của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block">Mật Khẩu</label>
                            <a href="#forgot" className="text-xs text-emerald-700 font-medium hover:underline">Quên mật khẩu?</a>
                        </div>
                        <input
                            type="password"
                            required
                            placeholder="Nhập mật khẩu bảo mật"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                        <input type="checkbox" id="remember" className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                        <label htmlFor="remember" className="text-xs text-stone-500 font-medium select-none cursor-pointer">Ghi nhớ đăng nhập</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-850 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 text-sm transform hover:scale-[1.01]"
                    >
                        Vào Hệ Thống
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-stone-500 text-xs">
                        Bạn chưa có tài khoản?{' '}
                        <Link to="/register" className="text-emerald-700 font-bold hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
