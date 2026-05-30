import { Link } from 'react-router-dom';

export default function CartView() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-extrabold text-stone-900">Giỏ Hàng Của Bạn</h1>
            
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-6 shadow-sm">
                <span className="text-6xl block">🛒</span>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-stone-850">Giỏ hàng của bạn đang trống</h2>
                    <p className="text-stone-500 text-sm max-w-sm mx-auto">
                        Hãy quay lại danh sách thảo dược và lựa chọn những vị thuốc bổ ích cho gia đình bạn nhé!
                    </p>
                </div>
                <div className="pt-2">
                    <Link to="/products" className="bg-emerald-850 hover:bg-emerald-800 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-200 inline-block">
                        Quay lại chọn sản phẩm
                    </Link>
                </div>
            </div>
        </div>
    );
}
