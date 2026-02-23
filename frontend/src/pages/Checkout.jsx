import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { useCart } from '@hooks/useCart'
import { useAuth } from '@hooks/useAuth'
import { createOrder } from '@redux/slices/ordersSlice'
import { clearCart } from '@redux/slices/cartSlice'
import { formatPrice, calculateSubtotal, calculateTax, calculateShipping } from '@utils/helpers'
import { validateCheckoutForm } from '@utils/validation'

const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items } = useCart()
    const { user } = useAuth()

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (items.length === 0) {
            navigate('/cart')
        }
    }, [items, navigate])

    const subtotal = calculateSubtotal(items)
    const tax = calculateTax(subtotal)
    const shipping = calculateShipping(subtotal)
    const total = subtotal + tax + shipping

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate form
        const validationErrors = validateCheckoutForm(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)

        try {
            // Create order
            await dispatch(
                createOrder({
                    items,
                    shippingAddress: {
                        fullName: formData.fullName,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                    },
                    total,
                })
            ).unwrap()

            // Clear cart
            dispatch(clearCart())

            // Navigate to orders page
            navigate('/orders')
        } catch (error) {
            console.error('Error creating order:', error)
            alert('Failed to place order. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (items.length === 0) {
        return null
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <form onSubmit={handleSubmit}>
                                {/* Shipping Information */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                                    <div className="space-y-4">
                                        <Input
                                            label="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            error={errors.fullName}
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={errors.email}
                                            required
                                        />
                                        <Input
                                            label="Address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            error={errors.address}
                                            required
                                        />
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <Input
                                                label="City"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                error={errors.city}
                                                required
                                            />
                                            <Input
                                                label="State"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                error={errors.state}
                                                required
                                            />
                                            <Input
                                                label="ZIP Code"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                error={errors.zipCode}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Note:</strong> This is a demo checkout. Use test card number:
                                            4242424242424242
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <Input
                                            label="Card Number"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            error={errors.cardNumber}
                                            placeholder="1234 5678 9012 3456"
                                            required
                                        />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Input
                                                label="Expiry Date"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleChange}
                                                error={errors.expiryDate}
                                                placeholder="MM/YY"
                                                required
                                            />
                                            <Input
                                                label="CVV"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                error={errors.cvv}
                                                placeholder="123"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full text-lg py-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-700">
                                            {item.title} × {item.quantity}
                                        </span>
                                        <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax (8%)</span>
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
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
