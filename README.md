# PlaceHub - Placement Management System

A full-stack MERN application for managing placement drives, student applications, and notifications.

## 📁 Project Structure

```
PlaceHub/
├── backend/              # Node.js/Express API server
│   ├── controllers/      # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── server.js         # Entry point
│   └── package.json
│
├── frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service
│   │   └── styles/       # CSS files
│   ├── package.json
│   └── vite.config.js
│
└── README.md             # This file
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placehub
NODE_ENV=development

npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## ✨ Features

- **Placement Drives Management** - Create and manage recruitment drives
- **Student Applications** - Track student applications
- **Notifications** - Real-time notifications system
- **REST API** - Comprehensive API documentation
- **Responsive UI** - Mobile-friendly frontend

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- MongoDB
- RESTful API

**Frontend:**
- React
- Vite
- CSS/Styling

## 📝 API Documentation

See [backend/API_REFERENCE.md](backend/API_REFERENCE.md) for detailed API endpoints.

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a pull request

## 📄 License

This project is open source and available under the MIT License.
