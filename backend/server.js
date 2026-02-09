import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/db.js'
import logger from './utils/logger.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    logger.info(`Server started on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`)
    logger.error(`Unhandled Rejection: ${err.message}`)
    // Close server & exit process
    server.close(() => process.exit(1))
})

// Handle SIGTERM
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...')
    logger.info('SIGTERM received. Shutting down gracefully...')
    server.close(() => {
        console.log('Process terminated')
        logger.info('Process terminated')
    })
})
