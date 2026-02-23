import { Link } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { Card } from '@components/ui/Card'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { useCart } from '@hooks/useCart'
import { formatPrice, getCategoryColor } from '@utils/helpers'

export const ProductCard = ({ product }) => {
    const { add } = useCart()

    const handleAddToCart = (e) => {
        e.preventDefault()
        add(product)
    }

    const renderStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />)
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />)
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" />)
            }
        }
        return stars
    }

    return (
        <Link to={`/product/${product.id}`}>
            <Card className="p-4 h-full flex flex-col animate-fade-in">
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100 h-48">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    {product.stock < 20 && (
                        <Badge
                            variant="danger"
                            className="absolute top-2 right-2"
                        >
                            Low Stock
                        </Badge>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                    {/* Category Badge */}
                    <Badge className={`${getCategoryColor(product.category)} mb-2 self-start`}>
                        {product.category}
                    </Badge>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                            ({product.rating})
                        </span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                        </span>
                        <Button
                            onClick={handleAddToCart}
                            variant="primary"
                            className="text-sm"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
