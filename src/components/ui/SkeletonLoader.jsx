// Skeleton loader for loading states
export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="bg-white rounded-lg p-4 animate-pulse">
                        <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                        <div className="flex justify-between">
                            <div className="h-6 bg-gray-300 rounded w-20"></div>
                            <div className="h-6 bg-gray-300 rounded w-16"></div>
                        </div>
                    </div>
                )
            case 'text':
                return (
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                )
            case 'product-detail':
                return (
                    <div className="grid md:grid-cols-2 gap-8 animate-pulse">
                        <div className="w-full h-96 bg-gray-300 rounded"></div>
                        <div>
                            <div className="h-8 bg-gray-300 rounded mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
                            <div className="h-10 bg-gray-300 rounded w-32 mb-4"></div>
                            <div className="h-12 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
            ))}
        </>
    )
}
