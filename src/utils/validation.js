import { isValidEmail } from './helpers'

export const validateLoginForm = ({ email, password }) => {
    const errors = {}

    if (!email) {
        errors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email'
    }

    if (!password) {
        errors.password = 'Password is required'
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
    }

    return errors
}

export const validateSignupForm = ({ name, email, password, confirmPassword }) => {
    const errors = {}

    if (!name) {
        errors.name = 'Name is required'
    } else if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters'
    }

    if (!email) {
        errors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email'
    }

    if (!password) {
        errors.password = 'Password is required'
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
    }

    return errors
}

export const validateCheckoutForm = ({
    fullName,
    email,
    address,
    city,
    state,
    zipCode,
    cardNumber,
    expiryDate,
    cvv,
}) => {
    const errors = {}

    if (!fullName) errors.fullName = 'Full name is required'
    if (!email) {
        errors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email'
    }
    if (!address) errors.address = 'Address is required'
    if (!city) errors.city = 'City is required'
    if (!state) errors.state = 'State is required'
    if (!zipCode) {
        errors.zipCode = 'ZIP code is required'
    } else if (!/^\d{5}$/.test(zipCode)) {
        errors.zipCode = 'Please enter a valid 5-digit ZIP code'
    }

    // Card validation (basic)
    if (!cardNumber) {
        errors.cardNumber = 'Card number is required'
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Please enter a valid 16-digit card number'
    }

    if (!expiryDate) {
        errors.expiryDate = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        errors.expiryDate = 'Please enter expiry date as MM/YY'
    }

    if (!cvv) {
        errors.cvv = 'CVV is required'
    } else if (!/^\d{3}$/.test(cvv)) {
        errors.cvv = 'Please enter a valid 3-digit CVV'
    }

    return errors
}
