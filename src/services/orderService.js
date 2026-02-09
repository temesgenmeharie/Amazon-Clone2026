// Mock order service
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock order storage
let orders = []

export const orderService = {
    // Create new order
    createOrder: async (orderData) => {
        await delay(600)

        const newOrder = {
            id: `ORD-${Date.now()}`,
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
        }

        orders.push(newOrder)

        // Save to localStorage for persistence
        try {
            const userOrders = JSON.parse(localStorage.getItem('orders') || '[]')
            userOrders.push(newOrder)
            localStorage.setItem('orders', JSON.stringify(userOrders))
        } catch (error) {
            console.error('Error saving order to localStorage:', error)
        }

        return newOrder
    },

    // Get user orders
    getUserOrders: async () => {
        await delay(500)

        try {
            const userOrders = JSON.parse(localStorage.getItem('orders') || '[]')
            return userOrders.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
        } catch (error) {
            console.error('Error fetching orders from localStorage:', error)
            return []
        }
    },

    // Get order by ID
    getOrderById: async (id) => {
        await delay(300)

        try {
            const userOrders = JSON.parse(localStorage.getItem('orders') || '[]')
            const order = userOrders.find((o) => o.id === id)

            if (!order) {
                throw new Error('Order not found')
            }

            return order
        } catch (error) {
            throw new Error('Order not found')
        }
    },
}
