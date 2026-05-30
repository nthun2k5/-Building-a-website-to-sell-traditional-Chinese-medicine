import { useState } from 'react';

interface HerbProduct {
    id: string;
    name: string;
    scientificName: string;
    price: number;
    category: string;
    imageUrl: string;
    description: string;
    benefits: string[];
}

const MOCK_PRODUCTS: HerbProduct[] = [
    {
        id: '1',
        name: 'Nhân Sâm Hàn Quốc (6 Năm Tuổi)',
        scientificName: 'Panax ginseng',
        price: 1550000,
        category: 'sam',
        imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
        description: 'Nhân sâm thượng hạng 6 năm tuổi giúp bồi bổ nguyên khí, tăng cường thể lực và hệ miễn dịch toàn diện.',
        benefits: ['Tăng thể lực', 'Bổ khí huyết', 'Minh mẫn đầu óc']
    },
    {
        id: '2',
        name: 'Nấm Linh Chi Đỏ Thái Tuế',
        scientificName: 'Ganoderma lucidum',
        price: 850000,
        category: 'linh-chi',
        imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=400',
        description: 'Linh chi hữu cơ hỗ trợ giải độc gan, điều hòa huyết áp và giúp an thần ngủ ngon giấc.',
        benefits: ['Hỗ trợ thải độc gan', 'Hạ huyết áp', 'Giúp ngủ ngon']
    },
    {
        id: '3',
        name: 'Trà Hoa Cúc Mẫu Đơn Dưỡng Nhan',
        scientificName: 'Chrysanthemum tea',
        price: 120000,
        category: 'tra',
        imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400',
        description: 'Trà hoa cúc nguyên bông giúp thanh nhiệt, sáng mắt, giải độc và mang lại tinh thần thư thái nhẹ nhàng.',
        benefits: ['Thanh nhiệt', 'Sáng mắt', 'Đẹp da']
    },
    {
        id: '4',
        name: 'Kỷ Tử Đỏ Ninh Hạ Thượng Hạng',
        scientificName: 'Lycium barbarum',
        price: 240000,
        category: 'thao-duoc',
        imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400',
        description: 'Kỷ tử đỏ ngọt thanh, mọng nước, rất giàu chất chống oxy hóa, hỗ trợ bổ thận, sáng mắt.',
        benefits: ['Bổ thận', 'Bổ mắt', 'Chống lão hóa']
    }
];

export default function ProductView() {
    const [selectedCat, setSelectedCat] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const matchesCategory = selectedCat === 'all' || product.category === selectedCat;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             product.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-8">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-stone-900">Danh Sách Dược Liệu</h1>
                    <p className="text-stone-500 text-sm mt-1">Sản phẩm thảo dược thiên nhiên tuyển chọn kỹ lưỡng</p>
                </div>
                
                {/* Search Bar */}
                <div className="w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Tìm tên thuốc, tên khoa học..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm text-sm"
                    />
                </div>
            </div>

            {/* Filter Tabs & Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="space-y-4 lg:col-span-1">
                    <h3 className="font-semibold text-stone-800 text-base uppercase tracking-wider">Phân Loại Dược Liệu</h3>
                    <div className="flex flex-wrap lg:flex-col gap-2">
                        {[
                            { id: 'all', label: 'Tất cả sản phẩm' },
                            { id: 'sam', label: 'Nhân Sâm Quý' },
                            { id: 'linh-chi', label: 'Nấm Linh Chi' },
                            { id: 'tra', label: 'Trà Thảo Mộc' },
                            { id: 'thao-duoc', label: 'Vị Thuốc Đông Y' }
                        ].map((cat) => (
                            <button 
                                key={cat.id}
                                onClick={() => setSelectedCat(cat.id)}
                                className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium transition duration-200 w-full ${
                                    selectedCat === cat.id
                                        ? 'bg-emerald-800 text-white shadow-md'
                                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition duration-300 overflow-hidden flex flex-col justify-between h-full group">
                                    <div>
                                        {/* Image */}
                                        <div className="relative aspect-square overflow-hidden bg-stone-100">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                            <span className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 space-y-2">
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-stone-800 group-hover:text-emerald-800 transition duration-200 text-base line-clamp-1">
                                                    {product.name}
                                                </h3>
                                                <p className="text-stone-400 text-xs italic">
                                                    {product.scientificName}
                                                </p>
                                            </div>
                                            <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                                                {product.description}
                                            </p>
                                            {/* Benefits */}
                                            <div className="flex flex-wrap gap-1 pt-2">
                                                {product.benefits.map((benefit, bIdx) => (
                                                    <span key={bIdx} className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-medium">
                                                        {benefit}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Price footer */}
                                    <div className="p-4 pt-0 border-t border-stone-50 flex items-center justify-between mt-auto">
                                        <span className="text-emerald-700 font-extrabold text-base">
                                            {product.price.toLocaleString()}đ
                                        </span>
                                        <button className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition duration-200">
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
                            <span className="text-4xl">🔍</span>
                            <h3 className="font-bold text-stone-700 mt-4">Không tìm thấy sản phẩm</h3>
                            <p className="text-stone-400 text-sm mt-1">Vui lòng thử từ khóa tìm kiếm khác hoặc đổi bộ lọc.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
