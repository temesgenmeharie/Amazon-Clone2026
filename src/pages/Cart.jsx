import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { useCart } from '@hooks/useCart'
import { formatPrice, calculateSubtotal, calculateTax, calculateShipping } from '@utils/helpers'

const Cart = () => {
    const navigate = useNavigate()
    const { items, remove, update } = useCart()

    const subtotal = calculateSubtotal(items)
    const tax = calculateTax(subtotal)
    const shipping = calculateShipping(subtotal)
    const total = subtotal + tax + shipping

    const handleCheckout = () => {
        navigate('/checkout')
    }

    if (items.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-16">
                <div className="container-custom text-center">
                    <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Add some products to get started!</p>
                    <Link to="/products">
                        <Button variant="primary">Shop Now</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <Card key={item.id} className="p-4">
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <Link to={`/product/${item.id}`}>
                                            <h3 className="font-semibold text-lg mb-1 hover:text-amazon-orange transition-colors">
                                                {item.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                                        <div className="text-xl font-bold text-gray-900">
                                            {formatPrice(item.price)}
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex flex-col items-end gap-4">
                                        <button
                                            onClick={() => remove(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <FaTrash />
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => update(item.id, Math.max(1, item.quantity - 1))}
                                                className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors font-semibold"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => update(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors font-semibold"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="text-sm text-gray-600">
                                            Subtotal: {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal ({items.length} items)</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Estimated Tax (8%)</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span>
                                        {shipping === 0 ? (
                                            <span className="text-green-600 font-semibold">FREE</span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>
                                {subtotal < 50 && (
                                    <p className="text-sm text-gray-600 italic">
                                        Add {formatPrice(50 - subtotal)} more for free shipping!
                                    </p>
                                )}
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Button onClick={handleCheckout} variant="primary" className="w-full text-lg py-3">
                                Proceed to Checkout
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
