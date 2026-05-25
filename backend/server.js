const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Optional MongoDB Connection (not required for JSON database)
// Uncomment the lines below if you want to use MongoDB instead of JSON database
// const connectDB = require('./config/db');
// connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Request logging in development mode
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
}

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Task Management System API is running smoothly.' });
});

// Database Connection Check (using JSON database, no MongoDB required)
const { readDb } = require('./config/jsonDb');
app.use((req, res, next) => {
  try {
    readDb(); // Verify JSON database is accessible
    next();
  } catch (err) {
    return res.status(503).json({
      message: 'Database is not accessible. Please check the database configuration.'
    });
  }
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
