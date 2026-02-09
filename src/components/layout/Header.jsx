import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '@hooks/useAuth'
import { useCart } from '@hooks/useCart'
import { logout } from '@redux/slices/authSlice'
import { setSearchQuery } from '@redux/slices/productsSlice'

export const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()
    const { itemCount } = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchInput.trim()) {
            dispatch(setSearchQuery(searchInput))
            navigate('/products')
            setSearchInput('')
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <header className="bg-amazon-dark text-white sticky top-0 z-40 shadow-md">
            <div className="container-custom">
                {/* Top Bar */}
                <div className="flex items-center justify-between py-3 gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-2xl font-bold">
                            amazon
                            <span className="text-amazon-orange">.clone</span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search products..."
                            className="flex-1 px-4 py-2 rounded-l text-gray-900 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="px-6 bg-amazon-orange hover:bg-amazon-orange-dark transition-colors rounded-r"
                            aria-label="Search"
                        >
                            <FaSearch />
                        </button>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="flex items-center gap-2 hover:text-amazon-orange transition-colors relative"
                        >
                            <FaShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amazon-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                            <span className="hidden lg:inline">Cart</span>
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <FaUser />
                                    <span className="text-sm">{user?.name}</span>
                                </div>
                                <Link
                                    to="/orders"
                                    className="text-sm hover:text-amazon-orange transition-colors"
                                >
                                    Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm hover:text-amazon-orange transition-colors"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden md:flex items-center gap-2 hover:text-amazon-orange transition-colors"
                            >
                                <FaUser size={20} />
                                <span>Sign In</span>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Search Bar - Mobile */}
                <form onSubmit={handleSearch} className="md:hidden pb-3 flex">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 px-4 py-2 rounded-l text-gray-900 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="px-6 bg-amazon-orange hover:bg-amazon-orange-dark transition-colors rounded-r"
                        aria-label="Search"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-amazon-dark-light border-t border-gray-700">
                    <nav className="container-custom py-4 flex flex-col gap-3">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 hover:text-amazon-orange transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 hover:text-amazon-orange transition-colors"
                        >
                            Products
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/orders"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-amazon-orange transition-colors"
                                >
                                    My Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setMobileMenuOpen(false)
                                    }}
                                    className="py-2 hover:text-amazon-orange transition-colors text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-amazon-orange transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-amazon-orange transition-colors"
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}

            {/* Category Bar */}
            <div className="bg-amazon-dark-light">
                <div className="container-custom py-2">
                    <nav className="flex gap-6 overflow-x-auto">
                        <Link
                            to="/products?category=all"
                            className="text-sm whitespace-nowrap hover:text-amazon-orange transition-colors"
                        >
                            All Products
                        </Link>
                        <Link
                            to="/products?category=Electronics"
                            className="text-sm whitespace-nowrap hover:text-amazon-orange transition-colors"
                        >
                            Electronics
                        </Link>
                        <Link
                            to="/products?category=Clothing"
                            className="text-sm whitespace-nowrap hover:text-amazon-orange transition-colors"
                        >
                            Clothing
                        </Link>
                        <Link
                            to="/products?category=Home & Kitchen"
                            className="text-sm whitespace-nowrap hover:text-amazon-orange transition-colors"
                        >
                            Home & Kitchen
                        </Link>
                        <Link
                            to="/products?category=Books"
                            className="text-sm whitespace-nowrap hover:text-amazon-orange transition-colors"
                        >
                            Books
                        </Link>
                        <Link
                            to="/products?category=Sports & Outdoors"
                            className="text-sm whitespace-nowrap hover:text-amazon-orange transition-colors"
                        >
                            Sports & Outdoors
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
