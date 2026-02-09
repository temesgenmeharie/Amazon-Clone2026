import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import { ApiError } from '../middleware/errorHandler.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body

        if (!orderItems || orderItems.length === 0) {
            return next(new ApiError('No order items', 400))
        }

        // Verify stock availability
        for (const item of orderItems) {
            const product = await Product.findById(item.productId)
            if (!product) {
                return next(new ApiError(`Product ${item.title} not found`, 404))
            }
            if (product.stock < item.quantity) {
                return next(
                    new ApiError(`Insufficient stock for ${item.title}`, 400)
                )
            }
        }

        // Create order
        const order = await Order.create({
            userId: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        // Update product stock
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity },
            })
        }

        // Clear user's cart
        await Cart.findOneAndUpdate(
            { userId: req.user._id },
            { items: [], total: 0 }
        )

        res.status(201).json({
            success: true,
            order,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({
            createdAt: -1,
        })

        res.json({
            success: true,
            count: orders.length,
            orders,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'userId',
            'name email'
        )

        if (!order) {
            return next(new ApiError('Order not found', 404))
        }

        // Make sure user owns order or is admin
        if (
            order.userId._id.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin'
        ) {
            return next(new ApiError('Not authorized', 403))
        }

        res.json({
            success: true,
            order,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return next(new ApiError('Order not found', 404))
        }

        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }
        order.status = 'processing'

        const updatedOrder = await order.save()

        res.json({
            success: true,
            order: updatedOrder,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return next(new ApiError('Order not found', 404))
        }

        order.isDelivered = true
        order.deliveredAt = Date.now()
        order.status = 'delivered'

        const updatedOrder = await order.save()

        res.json({
            success: true,
            order: updatedOrder,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get all orders
// @route   GET /api/orders/all
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })

        res.json({
            success: true,
            count: orders.length,
            orders,
        })
    } catch (error) {
        next(error)
    }
}
