// Reusable Button component
export const Button = ({
    children,
    variant = 'primary',
    type = 'button',
    onClick,
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'px-6 py-2.5 rounded font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
        primary: 'bg-amazon-orange hover:bg-amazon-orange-dark text-white focus:ring-amazon-orange',
        secondary: 'bg-amazon-blue hover:bg-amazon-blue-dark text-white focus:ring-amazon-blue',
        outline: 'border-2 border-amazon-orange text-amazon-orange hover:bg-amazon-orange hover:text-white focus:ring-amazon-orange',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400',
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
