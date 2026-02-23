import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrders } from '@redux/slices/ordersSlice'
import { Card } from '@components/ui/Card'
import { Badge } from '@components/ui/Badge'
import { Loader } from '@components/ui/Loader'
import { formatPrice, formatDate } from '@utils/helpers'

const Orders = () => {
    const dispatch = useDispatch()
    const { items, loading } = useSelector((state) => state.orders)

    useEffect(() => {
        dispatch(fetchUserOrders())
    }, [dispatch])

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
                <Loader size="large" />
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container-custom text-center">
                    <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
                    <p className="text-gray-600 mb-8">
                        You haven't placed any orders. Start shopping to see your orders here!
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="space-y-6">
                    {items.map((order) => (
                        <Card key={order.id} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b">
                                <div>
                                    <h2 className="text-xl font-bold mb-1">Order #{order.id}</h2>
                                    <p className="text-gray-600">
                                        Placed on {formatDate(order.createdAt)}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                                    <Badge variant="info">{order.status}</Badge>
                                    <p className="text-sm text-gray-600">
                                        Estimated Delivery: {formatDate(order.estimatedDelivery)}
                                    </p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-4 mb-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-sm font-semibold">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Total */}
                            <div className="flex justify-between items-center pt-4 border-t">
                                <span className="font-semibold">Total</span>
                                <span className="text-xl font-bold">
                                    {formatPrice(order.total)}
                                </span>
                            </div>

                            {/* Shipping Address */}
                            {order.shippingAddress && (
                                <div className="mt-4 pt-4 border-t">
                                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                                    <p className="text-sm text-gray-700">
                                        {order.shippingAddress.fullName}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {order.shippingAddress.address}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                                        {order.shippingAddress.zipCode}
                                    </p>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders
