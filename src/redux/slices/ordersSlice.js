import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { orderService } from '@services/orderService'

// Async thunk to create an order
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const order = await orderService.createOrder(orderData)
            return order
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (_, { rejectWithValue }) => {
        try {
            const orders = await orderService.getUserOrders()
            return orders
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        currentOrder: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Create order
            .addCase(createOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.currentOrder = action.payload
                state.items.unshift(action.payload)
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch user orders
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { clearCurrentOrder } = ordersSlice.actions

export default ordersSlice.reducer
