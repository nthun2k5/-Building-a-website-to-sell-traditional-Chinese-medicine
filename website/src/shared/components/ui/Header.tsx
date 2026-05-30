
const menuItems = [
  { icon: 'fa-solid fa-heart', name: 'Home', href: '/' },
  { icon: 'fa-solid fa-box', name: 'Products', href: '/products' },
  { icon: 'fa-solid fa-shopping-cart', name: 'Cart', href: '/cart' },
];

export default function Header() {
  return (

    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 m-auto">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto h-16">
        <div className="text-xl font-bold text-indigo-600">Tiệm thuốc Đông Y</div>
        <nav className="space-x-4">
          {menuItems.map((item) => (
            <a key={item.href} href={item.href} className="text-gray-600 hover:text-indigo-600 transition duration-200">
              <i className={item.icon}></i> {item.name}
            </a>
          ))}
        </nav>
        <nav>
          <a href="/login" className="text-gray-600 hover:text-indigo-600 transition duration-200">Login</a>
          <a href="/register" className="ml-4 text-gray-600 hover:text-indigo-600 transition duration-200">Register</a>
        </nav>
      </div>
    </header>
  )
}