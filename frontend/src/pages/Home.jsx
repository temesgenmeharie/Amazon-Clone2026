import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@components/ui/Button'
import { ProductGrid } from '@components/product/ProductGrid'
import { SkeletonLoader } from '@components/ui/SkeletonLoader'
import { productService } from '@services/productService'

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadFeaturedProducts = async () => {
            try {
                const products = await productService.getFeaturedProducts()
                setFeaturedProducts(products)
            } catch (error) {
                console.error('Error loading featured products:', error)
            } finally {
                setLoading(false)
            }
        }

        loadFeaturedProducts()
    }, [])

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amazon-blue to-amazon-blue-dark text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in">
                            Welcome to Amazon Clone
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Your one-stop shop for everything. Browse thousands of products across multiple categories.
                        </p>
                        <Link to="/products">
                            <Button variant="primary" className="text-lg px-8 py-3">
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports & Outdoors'].map(
                            (category) => (
                                <Link
                                    key={category}
                                    to={`/products?category=${category}`}
                                    className="card p-6 text-center hover:shadow-xl transition-shadow"
                                >
                                    <h3 className="font-semibold text-lg">{category}</h3>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <SkeletonLoader type="card" count={8} />
                        </div>
                    ) : (
                        <ProductGrid products={featuredProducts} />
                    )}
                </div>
            </section>

            {/* Promo Section */}
            <section className="bg-amazon-orange text-white py-16">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-4">Free Shipping on Orders Over $50!</h2>
                    <p className="text-xl mb-6">
                        Shop now and enjoy free delivery on eligible orders
                    </p>
                    <Link to="/products">
                        <Button variant="secondary" className="text-lg px-8 py-3">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home
