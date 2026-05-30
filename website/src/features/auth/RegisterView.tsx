import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterView() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Registration details:', { name, email, phone, password });
        alert('Chức năng đăng ký đang được cập nhật!');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl max-w-md w-full p-8 space-y-6 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -z-10"></div>

                <div className="text-center space-y-2">
                    <span className="text-3xl">🌱</span>
                    <h2 className="text-2xl font-extrabold text-stone-900">Tạo Tài Khoản Thành Viên</h2>
                    <p className="text-stone-500 text-sm">Gia nhập Đông Y Đường để nhận ưu đãi thành viên</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block">Họ và Tên</label>
                        <input
                            type="text"
                            required
                            placeholder="Nhập đầy đủ họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block">Địa Chỉ Email</label>
                        <input
                            type="email"
                            required
                            placeholder="username@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block">Số Điện Thoại</label>
                        <input
                            type="tel"
                            required
                            placeholder="Số điện thoại liên hệ"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block">Mật Khẩu</label>
                        <input
                            type="password"
                            required
                            placeholder="Mật khẩu chứa ít nhất 6 ký tự"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-850 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 text-sm transform hover:scale-[1.01]"
                    >
                        Đăng Ký Thành Viên
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-stone-500 text-xs">
                        Đã có tài khoản thành viên?{' '}
                        <Link to="/login" className="text-emerald-700 font-bold hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
