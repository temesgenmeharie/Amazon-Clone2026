import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '@services/authService'

// Async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await authService.login(credentials)
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for signup
export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await authService.signup(userData)
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Load user from localStorage
const loadUserFromStorage = () => {
    try {
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        return user && token ? { user: JSON.parse(user), token } : null
    } catch (error) {
        return null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: loadUserFromStorage()?.user || null,
        token: loadUserFromStorage()?.token || null,
        isAuthenticated: !!loadUserFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logout, clearError } = authSlice.actions

export default authSlice.reducer
