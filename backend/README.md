# Amazon Clone Backend API

Backend API for Amazon Clone e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication with bcrypt password hashing
- 📦 Product Management (CRUD operations)
- 🛒 Shopping Cart Management
- 📝 Order Processing
- 💳 Stripe Payment Integration
- 🔒 Role-based Access Control (User/Admin)
- ✅ Input Validation
- 🛡️ Security Best Practices (Helmet, CORS, Rate Limiting)
- 📊 Error Handling and Logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Payment**: Stripe
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Winston, Morgan

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe Account (for payments)

### Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Update the following in `.env`:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string (min 32 characters)
   - `STRIPE_SECRET_KEY` - Your Stripe secret key (test mode)
   - `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Seed the database with products**
   ```bash
   npm run seed
   ```

6. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products (with filters) | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/products/seed` | Seed products from JSON | Admin |

#### Product Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `search` - Search by title/description
- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `sort` - Sort by: `price-asc`, `price-desc`, `rating`, `newest`

### Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user's cart | Private |
| POST | `/api/cart/add` | Add item to cart | Private |
| PUT | `/api/cart/update` | Update item quantity | Private |
| DELETE | `/api/cart/remove/:productId` | Remove item | Private |
| DELETE | `/api/cart/clear` | Clear cart | Private |

### Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create new order | Private |
| GET | `/api/orders` | Get user's orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| PUT | `/api/orders/:id/pay` | Update order to paid | Private |
| GET | `/api/orders/all/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/deliver` | Update to delivered | Admin |

### Payment

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/payment/create-intent` | Create payment intent | Private |
| POST | `/api/payment/webhook` | Stripe webhook | Public |
| GET | `/api/payment/status/:orderId` | Get payment status | Private |

## Request Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Products with Filters
```bash
GET /api/products?category=Electronics&sort=price-asc&page=1&limit=12
```

### Add to Cart
```bash
POST /api/cart/add
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Create Order
```bash
POST /api/orders
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "orderItems": [...],
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "paymentMethod": "stripe",
  "itemsPrice": 100,
  "taxPrice": 8,
  "shippingPrice": 10,
  "totalPrice": 118
}
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Get the token from the login or register response and include it in subsequent requests.

## Database Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: 'user' or 'admin')
- timestamps

### Product
- title (String)
- description (String)
- price (Number)
- image (String)
- category (String)
- rating (Number)
- stock (Number)
- brand (String)
- timestamps

### Cart
- userId (ObjectId ref User)
- items (Array of cart items)
- total (Number)
- timestamps

### Order
- userId (ObjectId ref User)
- orderItems (Array)
- shippingAddress (Object)
- paymentMethod (String)
- paymentResult (Object)
- itemsPrice, taxPrice, shippingPrice, totalPrice (Numbers)
- isPaid, isDelivered (Booleans)
- status (String)
- timestamps

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet**: Security headers
- **Rate Limiting**: 100 requests per 10 minutes
- **Input Validation**: express-validator
- **Error Handling**: Centralized error handler
- **Environment Variables**: Sensitive data protection

## Testing

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for base URL and token
3. Test each endpoint

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'

# Get Products
curl http://localhost:5000/api/products
```

## Deployment

### Environment Variables (Production)

- Set `NODE_ENV=production`
- Use MongoDB Atlas for database
- Use Stripe live keys
- Generate a secure JWT secret

### Deployment Platforms

- **Render**: Easy deployment with free tier
- **Railway**: Simple setup with auto-scaling
- **Heroku**: Classic PaaS option
- **AWS**: More control and scalability

## Logs

Application logs are stored in:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access in MongoDB Atlas

### JWT Errors
- Check JWT_SECRET in .env
- Verify token is included in Authorization header
- Check token expiration

### Stripe Errors
- Verify Stripe API keys
- Check webhook secret for webhook endpoint
- Use Stripe test cards for testing

## License

MIT

## Author

Built for educational purposes as part of Amazon Clone e-commerce project.
