# PlaceHub Backend API

A Node.js/Express backend for the PlaceHub Placement Management System.

## Features

- RESTful API for managing placement drives
- Student application tracking
- Notification system for drive-specific updates
- MongoDB database integration
- CORS enabled for frontend communication

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placehub
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Placement Drives
- `GET /api/drives` - Get all placement drives
- `GET /api/drives/:id` - Get a specific drive
- `POST /api/drives` - Create a new drive (Admin)
- `PUT /api/drives/:id` - Update a drive (Admin)
- `DELETE /api/drives/:id` - Delete a drive (Admin)

### Applications
- `POST /api/applications/apply` - Apply for a drive (Student)
- `GET /api/applications/student/:studentId` - Get student's applications
- `GET /api/applications` - Get all applications (Admin)
- `GET /api/applications/drive/:driveId` - Get applications for a drive (Admin)

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/drive/:driveId` - Get notifications for a drive
- `POST /api/notifications` - Create a notification (Admin)
- `DELETE /api/notifications/:id` - Delete a notification (Admin)

## Database Setup

### MongoDB Local Setup
```bash
# Start MongoDB service
mongod
```

### MongoDB Atlas Setup
Replace the `MONGODB_URI` in `.env` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/placehub?retryWrites=true&w=majority
```

## Environment Configuration

The application supports multiple environments:

- **development**: Full error logging, detailed responses
- **production**: Minimal error details, optimized responses

Set the environment using the `NODE_ENV` variable:
```bash
NODE_ENV=production npm start
```

## API Response Format

All API responses follow this format:

### Success Response:
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message"
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Frontend Integration

The frontend should be configured to use:
```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

Make sure the frontend is running while the backend is active. See [PlaceHub Frontend README](../PlaceHub/README.md) for frontend setup.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check if the connection string is correct
- Verify network access (for MongoDB Atlas)

### Port Already in Use
```bash
# Change the PORT in .env file or use:
PORT=5001 npm start
```

### CORS Issues
The backend is configured to accept requests from `http://localhost:5173` (Vite default).
To modify allowed origins, edit the CORS configuration in `server.js`.

## Development Notes

- The database automatically creates collections when needed
- Validation is performed at the model level using Mongoose schemas
- Timestamps (`createdAt`, `updatedAt`) are automatically added to all documents

## License

This project is part of the PlaceHub Placement Management System.
