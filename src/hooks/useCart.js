import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@redux/slices/cartSlice'

// Custom hook for cart operations
export const useCart = () => {
    const dispatch = useDispatch()
    const { items, total } = useSelector((state) => state.cart)

    const add = (product, quantity = 1) => {
        dispatch(addToCart({ ...product, quantity }))
    }

    const remove = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const update = (productId, quantity) => {
        dispatch(updateQuantity({ id: productId, quantity }))
    }

    const clear = () => {
        dispatch(clearCart())
    }

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return {
        items,
        total,
        itemCount,
        add,
        remove,
        update,
        clear,
    }
}
