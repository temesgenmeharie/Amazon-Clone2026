import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import {
    fetchProducts,
    setSelectedCategory,
    filterProducts,
} from '@redux/slices/productsSlice'
import { ProductGrid } from '@components/product/ProductGrid'
import { SkeletonLoader } from '@components/ui/SkeletonLoader'

const ProductList = () => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { filteredItems, loading, searchQuery, selectedCategory } = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        const category = searchParams.get('category')
        if (category) {
            dispatch(setSelectedCategory(category))
        }
    }, [searchParams, dispatch])

    useEffect(() => {
        dispatch(filterProducts())
    }, [searchQuery, selectedCategory, dispatch])

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">
                        {selectedCategory === 'all' ? 'All Products' : selectedCategory}
                    </h1>
                    <p className="text-gray-600">
                        {filteredItems.length} {filteredItems.length === 1 ? 'product' : 'products'}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </p>
                </div>

                {/* Products */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <SkeletonLoader type="card" count={12} />
                    </div>
                ) : (
                    <ProductGrid products={filteredItems} />
                )}
            </div>
        </div>
    )
}

export default ProductList
