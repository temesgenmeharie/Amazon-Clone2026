import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import ordersReducer from './slices/ordersSlice'

// Middleware to sync cart to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    if (action.type?.startsWith('cart/')) {
        const cartState = store.getState().cart
        localStorage.setItem('cart', JSON.stringify(cartState))
    }
    return result
}

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem('cart')
        return cartData ? JSON.parse(cartData) : { items: [], total: 0 }
    } catch (error) {
        console.error('Error loading cart from storage:', error)
        return { items: [], total: 0 }
    }
}

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        auth: authReducer,
        orders: ordersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState: {
        cart: loadCartFromStorage(),
    },
})
