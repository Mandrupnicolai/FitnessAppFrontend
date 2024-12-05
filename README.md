# Fitness App

A comprehensive fitness tracking application built with React Native and MongoDB.

## Features

- User Profile Management
- Workout Planning and Tracking
- Progress Visualization
- Weight and Water Intake Tracking
- Customizable Fitness Goals
- Achievement System

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Expo CLI
- npm or yarn

## Project Structure

```
fitness-app/
├── backend/             # Backend server
│   ├── models/         # MongoDB models
│   ├── server.js       # Express server
│   └── package.json    # Backend dependencies
├── components/         # React Native components
├── screens/           # App screens
├── services/         # API services
└── assets/          # Images and assets
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/fitness_app
   JWT_SECRET=your-secret-key
   PORT=3000
   ```

4. Start the MongoDB server:
   ```bash
   mongod
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Install dependencies in the root directory:
   ```bash
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npx expo start
   ```

3. Use the Expo Go app on your mobile device to scan the QR code, or press 'a' to open in an Android emulator or 'i' for iOS simulator.

## Development

### Backend Development

The backend is built with:
- Express.js for the server
- MongoDB for the database
- Mongoose for object modeling
- JWT for authentication

### Frontend Development

The frontend is built with:
- React Native
- Expo
- React Navigation for routing
- Axios for API calls
- Chart.js for data visualization

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login

### User
- GET /api/users/:id/stats - Get user statistics
- PUT /api/users/:id - Update user profile

### Workouts
- POST /api/workouts - Create new workout
- GET /api/workouts/:userId - Get user's workouts

### Progress
- POST /api/progress/:userId/weight - Log weight
- GET /api/progress/:userId/weight - Get weight history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
