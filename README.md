# Amazon Clone - E-Commerce Web Application

A modern, fully functional Amazon-style e-commerce application built with React.js, Redux Toolkit, and Tailwind CSS. This project demonstrates industry best practices for building scalable web applications.

## 🚀 Features

- ✅ **Product Browsing** - Browse products across multiple categories
- ✅ **Search & Filter** - Real-time search and category filtering
- ✅ **Shopping Cart** - Add, remove, and update cart items with localStorage persistence
- ✅ **User Authentication** - Login and signup functionality
- ✅ **Protected Routes** - Secure cart, checkout, and order pages
- ✅ **Checkout Flow** - Complete order placement with form validation
- ✅ **Order History** - View past orders
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **State Management** - Redux Toolkit for global state
- ✅ **Code Splitting** - Lazy loading for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern React with Hooks
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **Axios** - HTTP client
- **React Icons** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd d:/Clone/Amazon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components (Button, Input, etc.)
│   ├── layout/      # Layout components (Header, Footer)
│   ├── product/     # Product-related components
│   └── ProtectedRoute.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── ProductList.jsx
│   ├── ProductDetailPage.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Orders.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── NotFound.jsx
├── redux/           # Redux store and slices
│   ├── store.js
│   └── slices/
│       ├── productsSlice.js
│       ├── cartSlice.js
│       ├── authSlice.js
│       └── ordersSlice.js
├── services/        # API services
│   ├── api.js
│   ├── productService.js
│   ├── authService.js
│   └── orderService.js
├── hooks/           # Custom React hooks
│   ├── useDebounce.js
│   ├── useAuth.js
│   └── useCart.js
├── utils/           # Utility functions
│   ├── helpers.js
│   └── validation.js
├── data/            # Mock data
│   └── products.json
├── App.jsx          # Root component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🎨 Design Features

### Amazon-Inspired Theme
- Custom color palette with Amazon orange (#FF9900) and blue (#146EB4)
- Dark navigation header (#131921)
- Clean card-based layouts
- Smooth hover effects and transitions

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Collapsible mobile menu
- Adaptive grid layouts

### Performance Optimizations
- Lazy loading for routes
- Code splitting
- Optimized images
- Skeleton loaders for loading states

## 🔐 Authentication

### Demo Credentials
- **Email:** john@example.com
- **Password:** password123

### Mock Backend
This project uses a mock backend with localStorage for data persistence. In a production environment, you would integrate with a real API.

## 🛒 Key Functionalities

### Shopping Cart
- Add products from product cards or detail pages
- Update quantities directly in cart
- Remove items
- Persistent cart (survives page refresh)
- Real-time price calculations

### Checkout Process
1. Review cart items
2. Enter shipping information
3. Enter payment details (mock)
4. Place order
5. View order confirmation

### Order Management
- View order history
- Track order status
- View shipping details
- See estimated delivery dates

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

## 📝 Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_API_URL=http://localhost:3000/api
```

## 🎯 Future Enhancements

- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Advanced filtering (price range, brand)
- [ ] Product recommendations
- [ ] Real payment integration (Stripe)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product inventory management
- [ ] Multi-language support

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## ⚖️ Legal Notice

This project is built for **educational purposes only**. It is not affiliated with Amazon.com, Inc. No copyrighted branding, logos, or real Amazon assets are used.

## 📄 License

MIT License - Feel free to use this project for learning and educational purposes.

## 👨‍💻 Author

Built as a demonstration of modern React.js e-commerce application development.

## 🙏 Acknowledgments

- Design inspiration from Amazon.com
- Product images from Unsplash
- Icons from React Icons library

---

**Note:** This is a demonstration project and should not be used for commercial purposes without proper licensing and integration with actual payment processing and backend services.
# Amazon-Clone2026
