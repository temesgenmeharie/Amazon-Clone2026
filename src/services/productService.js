import productsData from '@/data/products.json'

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const productService = {
    // Get all products
    getAllProducts: async () => {
        await delay(500)
        return productsData
    },

    // Get product by ID
    getProductById: async (id) => {
        await delay(300)
        const product = productsData.find((p) => p.id === parseInt(id))
        if (!product) {
            throw new Error('Product not found')
        }
        return product
    },

    // Search products
    searchProducts: async (query) => {
        await delay(400)
        const lowerQuery = query.toLowerCase()
        return productsData.filter(
            (product) =>
                product.title.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery)
        )
    },

    // Filter by category
    filterByCategory: async (category) => {
        await delay(300)
        if (category === 'all') {
            return productsData
        }
        return productsData.filter((product) => product.category === category)
    },

    // Get categories
    getCategories: () => {
        const categories = [...new Set(productsData.map((p) => p.category))]
        return ['all', ...categories]
    },

    // Get featured products
    getFeaturedProducts: async () => {
        await delay(300)
        return productsData
            .filter((p) => p.rating >= 4.7)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8)
    },
}
