// Reusable Card component
export const Card = ({ children, className = '', hover = true, ...props }) => {
    return (
        <div
            className={`card ${hover ? 'hover:shadow-xl' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}
