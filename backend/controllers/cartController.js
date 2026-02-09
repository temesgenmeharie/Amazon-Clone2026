import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import { ApiError } from '../middleware/errorHandler.js'

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id }).populate(
            'items.productId',
            'title price image stock'
        )

        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] })
        }

        res.json({
            success: true,
            cart,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body

        // Check if product exists and has stock
        const product = await Product.findById(productId)

        if (!product) {
            return next(new ApiError('Product not found', 404))
        }

        if (product.stock < quantity) {
            return next(new ApiError('Insufficient stock', 400))
        }

        // Find or create cart
        let cart = await Cart.findOne({ userId: req.user._id })

        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] })
        }

        // Check if item already in cart
        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        )

        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity
        } else {
            // Add new item
            cart.items.push({
                productId: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity,
            })
        }

        await cart.save()

        cart = await cart.populate('items.productId', 'title price image stock')

        res.status(201).json({
            success: true,
            cart,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body

        if (quantity < 1) {
            return next(new ApiError('Quantity must be at least 1', 400))
        }

        const cart = await Cart.findOne({ userId: req.user._id })

        if (!cart) {
            return next(new ApiError('Cart not found', 404))
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        )

        if (itemIndex === -1) {
            return next(new ApiError('Item not in cart', 404))
        }

        // Check stock
        const product = await Product.findById(productId)
        if (product.stock < quantity) {
            return next(new ApiError('Insufficient stock', 400))
        }

        cart.items[itemIndex].quantity = quantity
        await cart.save()

        const updatedCart = await cart.populate(
            'items.productId',
            'title price image stock'
        )

        res.json({
            success: true,
            cart: updatedCart,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
export const removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id })

        if (!cart) {
            return next(new ApiError('Cart not found', 404))
        }

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== req.params.productId
        )

        await cart.save()

        const updatedCart = await cart.populate(
            'items.productId',
            'title price image stock'
        )

        res.json({
            success: true,
            cart: updatedCart,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id })

        if (!cart) {
            return next(new ApiError('Cart not found', 404))
        }

        cart.items = []
        await cart.save()

        res.json({
            success: true,
            cart,
        })
    } catch (error) {
        next(error)
    }
}
