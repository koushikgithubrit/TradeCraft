import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/payment.js';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      waitQueueTimeoutMS: 15000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      heartbeatFrequencyMS: 5000,
      bufferCommands: true
    });

    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Initial database connection
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected! Attempting to reconnect...');
  connectDB();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  connectDB();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 