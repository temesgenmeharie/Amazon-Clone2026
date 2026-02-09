// Mock authentication service
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user database
const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123', // In production, this would be hashed
    },
]

export const authService = {
    // Login
    login: async ({ email, password }) => {
        await delay(800)

        const user = users.find((u) => u.email === email)

        if (!user || user.password !== password) {
            throw new Error('Invalid email or password')
        }

        // Generate mock token
        const token = btoa(`${user.id}:${Date.now()}`)

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        }
    },

    // Signup
    signup: async ({ name, email, password }) => {
        await delay(800)

        // Check if user already exists
        const existingUser = users.find((u) => u.email === email)
        if (existingUser) {
            throw new Error('User with this email already exists')
        }

        // Create new user
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password, // In production, this would be hashed
        }

        users.push(newUser)

        // Generate mock token
        const token = btoa(`${newUser.id}:${Date.now()}`)

        return {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        }
    },

    // Logout
    logout: async () => {
        await delay(200)
        return true
    },
}
