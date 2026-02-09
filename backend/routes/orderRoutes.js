import express from 'express'
import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/auth.js'
import { admin } from '../middleware/admin.js'

const router = express.Router()

// User routes
router.post('/', protect, createOrder)
router.get('/', protect, getUserOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)

// Admin routes
router.get('/all/orders', protect, admin, getAllOrders)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)

export default router
