import { Link } from 'react-router-dom'
import { Button } from '@components/ui/Button'

const NotFound = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold text-amazon-orange mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/">
                    <Button variant="primary" className="text-lg px-8 py-3">
                        Go Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound
