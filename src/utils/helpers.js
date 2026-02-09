// Format price to currency
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price)
}

// Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}

// Generate star rating array
export const generateStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return {
        full: fullStars,
        half: hasHalfStar ? 1 : 0,
        empty: emptyStars,
    }
}

// Calculate cart subtotal
export const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Calculate estimated tax (8% for example)
export const calculateTax = (subtotal) => {
    return subtotal * 0.08
}

// Calculate shipping (free over $50)
export const calculateShipping = (subtotal) => {
    return subtotal >= 50 ? 0 : 9.99
}

// Calculate total
export const calculateTotal = (items) => {
    const subtotal = calculateSubtotal(items)
    const tax = calculateTax(subtotal)
    const shipping = calculateShipping(subtotal)
    return subtotal + tax + shipping
}

// Debounce function
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Get initials from name
export const getInitials = (name) => {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
}

// Generate random order ID
export const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Get category color
export const getCategoryColor = (category) => {
    const colors = {
        Electronics: 'bg-blue-100 text-blue-800',
        Clothing: 'bg-purple-100 text-purple-800',
        'Home & Kitchen': 'bg-green-100 text-green-800',
        Books: 'bg-yellow-100 text-yellow-800',
        'Sports & Outdoors': 'bg-red-100 text-red-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
}
