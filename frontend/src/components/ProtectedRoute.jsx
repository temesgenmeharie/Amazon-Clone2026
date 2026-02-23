import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

// Protected route wrapper
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}
