import express from 'express'
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    seedProducts,
} from '../controllers/productController.js'
import { protect } from '../middleware/auth.js'
import { admin } from '../middleware/admin.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProductById)

// Admin routes
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.post('/seed', protect, admin, seedProducts)

export default router
