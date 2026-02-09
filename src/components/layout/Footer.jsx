import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer className="bg-amazon-dark text-white mt-auto">
            <div className="container-custom py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">About</h3>
                        <p className="text-sm text-gray-300">
                            Amazon Clone is a demonstration e-commerce platform built for educational purposes.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/products"
                                    className="text-sm text-gray-300 hover:text-amazon-orange transition-colors"
                                >
                                    Shop Now
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cart"
                                    className="text-sm text-gray-300 hover:text-amazon-orange transition-colors"
                                >
                                    Shopping Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/orders"
                                    className="text-sm text-gray-300 hover:text-amazon-orange transition-colors"
                                >
                                    My Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-300">Help Center</li>
                            <li className="text-sm text-gray-300">Returns</li>
                            <li className="text-sm text-gray-300">Shipping Info</li>
                            <li className="text-sm text-gray-300">Contact Us</li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Account</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-300 hover:text-amazon-orange transition-colors"
                                >
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    className="text-sm text-gray-300 hover:text-amazon-orange transition-colors"
                                >
                                    Create Account
                                </Link>
                            </li>
                            <li className="text-sm text-gray-300">Order History</li>
                            <li className="text-sm text-gray-300">Wishlist</li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-300">
                        © {new Date().getFullYear()} Amazon Clone. Built for educational purposes only.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-amazon-orange transition-colors"
                            aria-label="GitHub"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-amazon-orange transition-colors"
                            aria-label="Twitter"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-amazon-orange transition-colors"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
