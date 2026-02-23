import { useSelector } from 'react-redux'

// Custom hook to access authentication state
export const useAuth = () => {
    const { user, token, isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    )

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
    }
}
