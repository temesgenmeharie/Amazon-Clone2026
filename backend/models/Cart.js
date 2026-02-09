import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    title: String,
    price: Number,
    image: String,
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
})

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        items: [cartItemSchema],
        total: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

// Calculate total before saving
cartSchema.pre('save', function (next) {
    this.total = this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    next()
})

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
