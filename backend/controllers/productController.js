import Product from '../models/Product.js'
import { ApiError } from '../middleware/errorHandler.js'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// @desc    Get all products with pagination, search, and filter
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 12
        const skip = (page - 1) * limit

        // Build query
        const query = {}

        // Search by title or description
        if (req.query.search) {
            query.$text = { $search: req.query.search }
        }

        // Filter by category
        if (req.query.category) {
            query.category = req.query.category
        }

        // Filter by price range
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {}
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice)
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice)
        }

        // Sort options
        let sort = {}
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'price-asc':
                    sort = { price: 1 }
                    break
                case 'price-desc':
                    sort = { price: -1 }
                    break
                case 'rating':
                    sort = { rating: -1 }
                    break
                case 'newest':
                    sort = { createdAt: -1 }
                    break
                default:
                    sort = { createdAt: -1 }
            }
        } else {
            sort = { createdAt: -1 }
        }

        const total = await Product.countDocuments(query)
        const products = await Product.find(query).sort(sort).skip(skip).limit(limit)

        res.json({
            success: true,
            count: products.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            products,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ApiError('Product not found', 404))
        }

        res.json({
            success: true,
            product,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            product,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!product) {
            return next(new ApiError('Product not found', 404))
        }

        res.json({
            success: true,
            product,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ApiError('Product not found', 404))
        }

        await product.deleteOne()

        res.json({
            success: true,
            message: 'Product removed',
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Seed products from JSON file
// @route   POST /api/products/seed
// @access  Private/Admin
export const seedProducts = async (req, res, next) => {
    try {
        // Delete existing products
        await Product.deleteMany()

        // Read products from frontend data
        const productsPath = path.join(
            __dirname,
            '../../src/data/products.json'
        )
        const productsData = await fs.readFile(productsPath, 'utf-8')
        const products = JSON.parse(productsData)

        // Insert products
        await Product.insertMany(products)

        res.json({
            success: true,
            message: `${products.length} products seeded successfully`,
        })
    } catch (error) {
        next(error)
    }
}
