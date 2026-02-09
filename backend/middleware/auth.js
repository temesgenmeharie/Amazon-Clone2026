import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { ApiError } from './errorHandler.js'

// Protect routes - authentication middleware
export const protect = async (req, res, next) => {
    let token

    // Check if token exists in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            if (!req.user) {
                return next(new ApiError('User not found', 401))
            }

            next()
        } catch (error) {
            return next(new ApiError('Not authorized, token failed', 401))
        }
    }

    if (!token) {
        return next(new ApiError('Not authorized, no token', 401))
    }
}
