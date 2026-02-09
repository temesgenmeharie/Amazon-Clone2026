import express from 'express'
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from '../controllers/cartController.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'

const router = express.Router()

// Validation
const cartItemValidation = [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
]

// All cart routes are protected
router.get('/', protect, getCart)
router.post('/add', protect, cartItemValidation, addToCart)
router.put('/update', protect, cartItemValidation, updateCartItem)
router.delete('/remove/:productId', protect, removeFromCart)
router.delete('/clear', protect, clearCart)

export default router
