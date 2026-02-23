// Reusable Input component
export const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    disabled = false,
    required = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                {...props}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    )
}
