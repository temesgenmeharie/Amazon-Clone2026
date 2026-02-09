import express from 'express'
import {
    createPaymentIntent,
    handleWebhook,
    getPaymentStatus,
} from '../controllers/paymentController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Protected routes
router.post('/create-intent', protect, createPaymentIntent)
router.get('/status/:orderId', protect, getPaymentStatus)

// Webhook route (no auth - Stripe signature verification)
router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    handleWebhook
)

export default router
