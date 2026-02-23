import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            switch (error.response.status) {
                case 401:
                    // Unauthorized - clear local storage and redirect to login
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                    break
                case 403:
                    console.error('Forbidden access')
                    break
                case 404:
                    console.error('Resource not found')
                    break
                case 500:
                    console.error('Server error')
                    break
                default:
                    console.error('An error occurred:', error.response.statusText)
            }
        } else if (error.request) {
            console.error('No response from server')
        } else {
            console.error('Error:', error.message)
        }
        return Promise.reject(error)
    }
)

export default api
