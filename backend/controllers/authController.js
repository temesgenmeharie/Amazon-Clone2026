import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import { ApiError } from '../middleware/errorHandler.js'

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // Check if user exists
        const userExists = await User.findOne({ email })

        if (userExists) {
            return next(new ApiError('User already exists', 400))
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        })

        // Generate token
        const token = generateToken(user._id)

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Check for user email
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return next(new ApiError('Invalid credentials', 401))
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return next(new ApiError('Invalid credentials', 401))
        }

        // Generate token
        const token = generateToken(user._id)

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        next(error)
    }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email

            if (req.body.password) {
                user.password = req.body.password
            }

            const updatedUser = await user.save()

            res.json({
                success: true,
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                },
            })
        } else {
            return next(new ApiError('User not found', 404))
        }
    } catch (error) {
        next(error)
    }
}
