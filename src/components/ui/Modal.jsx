import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

// Modal dialog component
export const Modal = ({ isOpen, onClose, title, children, footer }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 animate-fade-in">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <FaTimes size={20} />
                    </button>

                    {/* Title */}
                    {title && (
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pr-8">
                            {title}
                        </h2>
                    )}

                    {/* Content */}
                    <div className="mb-4">{children}</div>

                    {/* Footer */}
                    {footer && <div className="flex justify-end gap-3">{footer}</div>}
                </div>
            </div>
        </div>
    )
}
