import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    const { email, name, picture, sub: googleId } = payload;

    // Find or create user
    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({
        email,
        name,
        picture,
        googleId,
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrb3VzaGlrIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzMjQ0NDk3fQ.px9F1enCELkkZsiNnVwPLT1hFlLsgxV_GuWFrvxlxL0',
      { expiresIn: '7d' }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin,
        mobile: user.mobile,
      },
    });
  } catch (error: any) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      message: error.message || 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, isAdmin, mobile } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      isAdmin: email === 'koushikadak2004@gmail.com' || !!isAdmin,
      mobile
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        mobile: user.mobile,
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: error.message || 'Error creating user',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Add retry logic for findOne operation
    let user = null;
    let retries = 3;
    let lastError = null;

    while (retries > 0 && !user) {
      try {
        // Find user with timeout promise
        user = await Promise.race([
          User.findOne({ email }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database operation timed out')), 5000)
          )
        ]);
        
        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        lastError = error;
        retries--;
        if (retries > 0) {
          console.log(`Retrying login operation. Attempts remaining: ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        }
      }
    }

    if (!user && lastError) {
      console.error('Login operation failed after retries:', lastError);
      return res.status(500).json({ message: 'Database operation failed, please try again' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Ensure default admin
    if (user.email === 'koushikadak2004@gmail.com' && !user.isAdmin) {
      user.isAdmin = true;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isAdmin: user.isAdmin,
        mobile: user.mobile,
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: error.message || 'Error logging in',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    // Authenticate admin (simple header token check for now)
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const adminUser = await User.findById((decoded as any).userId);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ message: 'Not authorized' });

    const users = await User.find({}, 'name email mobile isAdmin courses');
    // Calculate progress for each user
    const userList = users.map(u => {
      // Progress: total completed topics / total topics
      let totalCompleted = 0;
      let totalTopics = 0;
      u.courses.forEach(c => {
        totalCompleted += c.completedTopics.length;
        totalTopics += c.completedTopics.length + (c.progress ? Math.round((100 - c.progress) / 100 * c.completedTopics.length) : 0);
      });
      return {
        name: u.name,
        email: u.email,
        mobile: u.mobile,
        isAdmin: u.isAdmin,
        progress: totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0
      };
    });
    res.json(userList);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById((decoded as any).userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      isAdmin: user.isAdmin,
      mobile: user.mobile
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
