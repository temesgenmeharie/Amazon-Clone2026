import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a product title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a product description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: 0,
        },
        image: {
            type: String,
            required: [true, 'Please provide a product image URL'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: [
                'Electronics',
                'Clothing',
                'Home & Kitchen',
                'Books',
                'Sports & Outdoors',
            ],
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        stock: {
            type: Number,
            required: [true, 'Please provide stock count'],
            min: 0,
            default: 0,
        },
        brand: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

// Index for search functionality
productSchema.index({ title: 'text', description: 'text' })

const Product = mongoose.model('Product', productSchema)

export default Product
