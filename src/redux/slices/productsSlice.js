import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productService } from '@services/productService'

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const products = await productService.getAllProducts()
            return products
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk to fetch product by ID
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const product = await productService.getProductById(id)
            return product
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk to search products
export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (query, { rejectWithValue }) => {
        try {
            const products = await productService.searchProducts(query)
            return products
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        filteredItems: [],
        currentProduct: null,
        loading: false,
        error: null,
        searchQuery: '',
        selectedCategory: 'all',
        priceRange: { min: 0, max: 10000 },
        sortBy: 'default',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        filterProducts: (state) => {
            let filtered = [...state.items]

            // Filter by search query
            if (state.searchQuery) {
                filtered = filtered.filter((product) =>
                    product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
            }

            // Filter by category
            if (state.selectedCategory !== 'all') {
                filtered = filtered.filter(
                    (product) => product.category === state.selectedCategory
                )
            }

            // Filter by price range
            filtered = filtered.filter(
                (product) =>
                    product.price >= state.priceRange.min &&
                    product.price <= state.priceRange.max
            )

            // Sort products
            switch (state.sortBy) {
                case 'price-low':
                    filtered.sort((a, b) => a.price - b.price)
                    break
                case 'price-high':
                    filtered.sort((a, b) => b.price - a.price)
                    break
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating)
                    break
                default:
                    break
            }

            state.filteredItems = filtered
        },
        clearFilters: (state) => {
            state.searchQuery = ''
            state.selectedCategory = 'all'
            state.priceRange = { min: 0, max: 10000 }
            state.sortBy = 'default'
            state.filteredItems = state.items
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.filteredItems = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false
                state.currentProduct = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Search products
            .addCase(searchProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.filteredItems = action.payload
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const {
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    filterProducts,
    clearFilters,
} = productsSlice.actions

export default productsSlice.reducer
