import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { SkeletonLoader } from '@components/ui/SkeletonLoader'
import { useCart } from '@hooks/useCart'
import { productService } from '@services/productService'
import { formatPrice, getCategoryColor } from '@utils/helpers'

const ProductDetailPage = () => {
    const { id } = useParams()
    const { add } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await productService.getProductById(id)
                setProduct(data)
            } catch (error) {
                console.error('Error loading product:', error)
            } finally {
                setLoading(false)
            }
        }

        loadProduct()
    }, [id])

    const handleAddToCart = () => {
        add(product, quantity)
    }

    const renderStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" size={20} />)
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" size={20} />)
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" size={20} />)
            }
        }
        return stars
    }

    if (loading) {
        return (
            <div className="container-custom py-8">
                <SkeletonLoader type="product-detail" count={1} />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container-custom py-8 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg p-6 md:p-8 shadow-md">
                    {/* Product Image */}
                    <div>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <Badge className={`${getCategoryColor(product.category)} mb-4 self-start`}>
                            {product.category}
                        </Badge>

                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            {renderStars(product.rating)}
                            <span className="text-lg text-gray-600">({product.rating})</span>
                        </div>

                        {/* Price */}
                        <div className="text-4xl font-bold text-gray-900 mb-6">
                            {formatPrice(product.price)}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Product Details */}
                        <div className="mb-6 pb-6 border-b">
                            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li>
                                    <span className="font-medium">Brand:</span> {product.brand}
                                </li>
                                <li>
                                    <span className="font-medium">Stock:</span>{' '}
                                    {product.stock > 0 ? (
                                        <span className="text-green-600">In Stock ({product.stock} available)</span>
                                    ) : (
                                        <span className="text-red-600">Out of Stock</span>
                                    )}
                                </li>
                            </ul>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded border border-gray-300 hover:bg-gray-100 transition-colors font-semibold"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="w-10 h-10 rounded border border-gray-300 hover:bg-gray-100 transition-colors font-semibold"
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            onClick={handleAddToCart}
                            variant="primary"
                            className="w-full text-lg py-3"
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage
