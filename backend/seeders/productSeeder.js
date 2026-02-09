import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Product from '../models/Product.js'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Connect to DB
connectDB()

const seedProducts = async () => {
    try {
        console.log('Loading products data...')

        // Read products from frontend data
        const productsPath = path.join(__dirname, '../../src/data/products.json')
        const productsData = await fs.readFile(productsPath, 'utf-8')
        const products = JSON.parse(productsData)

        console.log(`Found ${products.length} products`)

        // Delete existing products
        await Product.deleteMany()
        console.log('Deleted existing products')

        // Insert products
        await Product.insertMany(products)
        console.log(`Successfully seeded ${products.length} products`)

        process.exit(0)
    } catch (error) {
        console.error('Error seeding products:', error)
        process.exit(1)
    }
}

seedProducts()
