import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { login } from '@redux/slices/authSlice'
import { useAuth } from '@hooks/useAuth'
import { validateLoginForm } from '@utils/validation'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, loading, error } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validateLoginForm(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        await dispatch(login(formData))
    }

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
            <div className="w-full max-w-md px-4">
                <Card className="p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-amazon-blue hover:underline font-medium">
                                Create one
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
                        <p className="text-sm text-blue-800 font-semibold mb-2">Demo Credentials:</p>
                        <p className="text-sm text-blue-800">Email: john@example.com</p>
                        <p className="text-sm text-blue-800">Password: password123</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login
