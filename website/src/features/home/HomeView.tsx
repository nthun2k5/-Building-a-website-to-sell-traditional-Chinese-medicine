import { Link } from 'react-router-dom';

export default function HomeView() {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative bg-emerald-950 text-white rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center space-y-6">
                    <span className="bg-emerald-800/80 text-emerald-200 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border border-emerald-700/50">
                        Tinh Hoa Y Học Cổ Truyền
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        Chăm sóc Sức Khỏe <br />
                        <span className="text-emerald-400">Bằng Thảo Dược Tự Nhiên</span>
                    </h1>
                    <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Cung cấp các sản phẩm Đông Y, trà thảo mộc và vị thuốc cổ truyền đạt chuẩn dược liệu sạch, mang lại sự cân bằng trọn vẹn cho thân - tâm - trí.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/products" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-8 py-4 rounded-xl shadow-lg transition duration-300 text-center transform hover:-translate-y-0.5">
                            Khám Phá Dược Liệu
                        </Link>
                        <a href="#about" className="bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-700/50 text-emerald-100 font-semibold px-8 py-4 rounded-xl transition duration-300 text-center backdrop-blur-sm">
                            Tìm Hiểu Đông Y
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-stone-900">Danh Mục Sản Phẩm</h2>
                    <p className="text-stone-500 max-w-md mx-auto">Lựa chọn những giải pháp thảo dược tốt nhất được phân chia theo nhu cầu của bạn</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Sâm & Thảo Dược Quý', desc: 'Nhân sâm, Linh chi, Đông trùng hạ thảo bồi bổ khí huyết.', icon: '👑', color: 'from-amber-500/10 to-amber-600/10 border-amber-500/20' },
                        { title: 'Trà Thảo Mộc Tự Nhiên', desc: 'Trà hoa cúc, trà dưỡng nhan giúp thanh lọc, giải độc cơ thể.', icon: '🍵', color: 'from-emerald-500/10 to-emerald-600/10 border-emerald-500/20' },
                        { title: 'Vị Thuốc Cổ Truyền', desc: 'Các vị thuốc bắc, thuốc nam bốc theo thang chuẩn y khoa cổ truyền.', icon: '🌿', color: 'from-teal-500/10 to-teal-600/10 border-teal-500/20' }
                    ].map((cat, idx) => (
                        <div key={idx} className={`p-6 rounded-2xl border bg-gradient-to-br ${cat.color} hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col justify-between group cursor-pointer`}>
                            <div className="space-y-4">
                                <span className="text-4xl block transform group-hover:scale-110 transition duration-300 w-fit">{cat.icon}</span>
                                <h3 className="text-xl font-bold text-stone-800">{cat.title}</h3>
                                <p className="text-stone-600 text-sm leading-relaxed">{cat.desc}</p>
                            </div>
                            <span className="text-emerald-700 font-medium text-sm inline-flex items-center mt-6 group-hover:translate-x-1 transition duration-300">
                                Xem chi tiết &rarr;
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-stone-100 p-8 md:p-12 rounded-3xl">
                <div className="space-y-6">
                    <span className="text-emerald-700 text-xs font-bold tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-full">
                        Về chúng tôi
                    </span>
                    <h2 className="text-3xl font-extrabold text-stone-900 leading-tight">
                        Dược Liệu Sạch <br />
                        Nguồn Gốc Rõ Ràng
                    </h2>
                    <p className="text-stone-600 leading-relaxed font-light">
                        Chúng tôi cam kết mang tới tay khách hàng những sản phẩm thảo dược có chất lượng cao nhất. Toàn bộ nguyên liệu đều được thu hoạch từ các vùng trồng dược liệu sạch chuẩn GACP-WHO và trải qua quy trình sấy lạnh giữ nguyên dược tính tối đa.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
                            <h4 className="text-emerald-700 font-bold text-lg">100% Tự Nhiên</h4>
                            <p className="text-xs text-stone-500">Không chất bảo quản, phụ gia hóa học.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
                            <h4 className="text-emerald-700 font-bold text-lg">Đạt chuẩn Bộ Y Tế</h4>
                            <p className="text-xs text-stone-500">Giấy kiểm nghiệm chất lượng đầy đủ.</p>
                        </div>
                    </div>
                </div>
                {/* Visual Card */}
                <div className="bg-emerald-900 text-emerald-100 p-8 rounded-2xl flex flex-col justify-between aspect-[4/3] relative overflow-hidden shadow-lg">
                    <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-emerald-800/50 blur-3xl"></div>
                    <span className="text-5xl">🔬</span>
                    <div className="space-y-2 relative z-10">
                        <h3 className="text-2xl font-bold">Kiểm Định Nghiêm Ngặt</h3>
                        <p className="text-emerald-200/80 text-sm leading-relaxed">
                            Mỗi lô dược liệu đều được kiểm tra các chỉ tiêu kim loại nặng, nấm mốc, dư lượng thuốc bảo vệ thực vật trước khi đóng gói thành phẩm gửi tới khách hàng.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
