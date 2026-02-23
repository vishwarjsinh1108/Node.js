# Smart Admin Panel Management System

A modern, full-stack admin dashboard built with React, Node.js, Express, and MongoDB.

## Features
- **Admin Authentication**: Secure JWT-based login and logout.
- **Dashboard**: Real-time stats for users, products, and orders.
- **User Management**: Full CRUD for system users.
- **Product Management**: Manage inventory with image support and categories.
- **Order Management**: Track and update order statuses.
- **Modern UI**: Responsive design with Dark/Light mode support.
- **Rich Tech Stack**: Framer Motion for animations, Lucide React for icons, Tailwind CSS for styling.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide Icons, Framer Motion, React Router.
- **Backend**: Node.js, Express.js, JWT, BcryptJS, Morgan, Multer.
- **Database**: MongoDB (Mongoose).

## Installation

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed or a connection string from MongoDB Atlas.

### 1. Clone the project
```bash
# Navigate to the project directory
cd Admin_panel
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
Seed the database with default admin:
```bash
node seeder.js
# This creates: admin@example.com / password123
```
Start the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## Folder Structure
```text
Admin_panel/
├── client/          # Vite + React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
└── server/          # Node.js + Express Backend
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    └── middlewares/
```

## Default Credentials
- **Email**: admin@example.com
- **Password**: password123
