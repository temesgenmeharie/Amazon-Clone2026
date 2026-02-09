import stripe from '../config/stripe.js'
import Order from '../models/Order.js'
import { ApiError } from '../middleware/errorHandler.js'

// @desc    Create payment intent
// @route   POST /api/payment/create-intent
// @access  Private
export const createPaymentIntent = async (req, res, next) => {
    try {
        const { amount, orderId } = req.body

        if (!amount || amount <= 0) {
            return next(new ApiError('Invalid amount', 400))
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                orderId: orderId || 'pending',
                userId: req.user._id.toString(),
            },
        })

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Handle Stripe webhook
// @route   POST /api/payment/webhook
// @access  Public (Stripe signature verification)
export const handleWebhook = async (req, res, next) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            // Update order payment status
            if (paymentIntent.metadata.orderId) {
                await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
                    isPaid: true,
                    paidAt: Date.now(),
                    paymentResult: {
                        id: paymentIntent.id,
                        status: paymentIntent.status,
                    },
                    status: 'processing',
                })
            }
            break

        case 'payment_intent.payment_failed':
            console.log('Payment failed:', event.data.object)
            break

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true })
}

// @desc    Get payment status
// @route   GET /api/payment/status/:orderId
// @access  Private
export const getPaymentStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId)

        if (!order) {
            return next(new ApiError('Order not found', 404))
        }

        // Check if user owns the order
        if (order.userId.toString() !== req.user._id.toString()) {
            return next(new ApiError('Not authorized', 403))
        }

        res.json({
            success: true,
            isPaid: order.isPaid,
            paidAt: order.paidAt,
            paymentResult: order.paymentResult,
        })
    } catch (error) {
        next(error)
    }
}
