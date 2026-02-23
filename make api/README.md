# Admin Panel Backend API

A complete backend REST API for an Admin Panel Management System built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: Admin registration, login, JWT token generation, password hashing.
- **User Management**: Full CRUD for users with search, pagination, and filtering.
- **Product Management**: Full CRUD for products with image upload using Multer.
- **Orders Management**: Order creation and status tracking.
- **Dashboard**: Aggregated stats (total users, products, orders, revenue).
- **Security**: JWT middleware, Role-based authorization.
- **Database**: MongoDB with Mongoose.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs
- Multer (Image Upload)
- API Features (Filtering, Sorting, Pagination)

## Prerequisites

- Node.js installed
- MongoDB installed or MongoDB Atlas URI

## Installation Steps

1. **Clone the repository** (or copy files)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env` file in the root directory (already provided in this setup).
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/admin-panel
   JWT_SECRET=your_super_secret_jwt_key_123
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```
4. **Start the server**:
   ```bash
   node index.js
   ```
   *For development:* `npm install -D nodemon` and run `npx nodemon index.js`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/profile` - Get admin profile (Protected)
- `PUT /api/auth/profile` - Update admin profile (Protected)

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users (Supports ?page=1&limit=10&sort=name)
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `POST /api/products` - Add product (Multipart/form-data for image)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id/status` - Update order status (pending/processing/shipped/delivered/cancelled)
- `DELETE /api/orders/:id` - Delete order

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard stats

## Postman Testing Instructions

1. **Register/Login**: Use the `POST /api/auth/register` or `login` to get a JWT token.
2. **Authorization**: Copy the `token` from the response.
3. **API Requests**: In Postman, go to the **Authorization** tab, select **Bearer Token**, and paste the token there for protected routes.
4. **Image Upload**: When creating or updating products, use `form-data` in the Body tab. Set a key named `image` with type `File`.

## Project Structure

```
├── config/             # DB connection
├── controllers/        # Logic for each route
├── middleware/         # Auth, error, upload middleware
├── models/             # Mongoose schemas
├── routes/             # Route definitions
├── utils/              # Helper classes (APIFeatures)
├── uploads/            # Uploaded images
├── .env                # Env variables
├── index.js            # Entry point
└── package.json        # Dependencies
```
