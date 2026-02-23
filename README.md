# Amazon Clone 2026 - Full Stack E-Commerce

A modern, full-stack Amazon-style e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Project Overview

This project consists of two main parts:
- **Frontend**: A React application built with Vite, Redux Toolkit, and Tailwind CSS.
- **Backend**: A Node.js/Express API with MongoDB integration, JWT authentication, and Stripe payment processing.

## 📁 Project Structure

```
Amazon-Clone/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
├── vercel.json        # Vercel deployment configuration
└── README.md          # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite)
- **Redux Toolkit** (State Management)
- **Tailwind CSS** (Styling)
- **React Router 6** (Routing)
- **Axios** (API Client)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **JWT** (Authentication)
- **Stripe** (Payment Processing)
- **Winston & Morgan** (Logging)

## ⚡ Quick Start

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Stripe Account (for payments)

### 2. Frontend Setup
```bash
cd frontend
npm install
# Create .env and set VITE_API_URL
npm run dev
```

### 3. Backend Setup
```bash
cd backend
npm install
# Create .env and set MONGO_URI, JWT_SECRET, etc.
npm run seed  # To populate initial product data
npm run dev
```

## 🌐 Deployment

### Deploying to Vercel
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Vercel will detect the project structure. You may need to configure individual projects for the frontend and backend or use the provided `vercel.json`.

**Environment Variables Checklist:**
- **Frontend**: `VITE_API_URL`
- **Backend**: `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `FRONTEND_URL`, `NODE_ENV`

## 🧪 Development Commands

- `npm run dev` (in frontend): Start Vite dev server.
- `npm run dev` (in backend): Start Nodemon dev server.
- `npm run seed` (in backend): Seed database with mock products.
- `npm run build` (in frontend): Build for production.

## 🤝 Contributing
Feel free to fork and submit pull requests!

## 📄 License
MIT License
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product inventory management

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
