import { ApiError } from './errorHandler.js'

// Check if user is admin
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        return next(new ApiError('Not authorized as admin', 403))
    }
}
