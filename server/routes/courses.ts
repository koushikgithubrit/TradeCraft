import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course' });
  }
});

// Create new course
router.post('/', async (req, res) => {
  try {
    const { title, description, modules } = req.body;
    const course = new Course({
      title,
      description,
      modules,
      isFree: true // Initially set as free
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course' });
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
});

// Get course details (requires authentication)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if user has purchased the course
    const userCourse = user.courses.find(c => c.courseId.toString() === (course as any)._id.toString());
    if (!userCourse) {
      return res.status(403).json({ error: 'Course not purchased' });
    }

    res.json({
      course,
      progress: userCourse.progress,
      completedTopics: userCourse.completedTopics,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course details' });
  }
});

// Enroll in a course
router.post('/enroll', verifyToken, async (req, res) => {
  try {
    const userId = (req.user as any).userId;
    const { courseTitle } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already enrolled
    const isEnrolled = user.courses.some(course => course.title === courseTitle);
    if (isEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add course to user's courses array
    const courseData = {
      courseId: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the course
      title: courseTitle,
      progress: 0,
      completedTopics: []
    };

    // Add to courses array
    user.courses.push(courseData);

    // Save the updated user document
    await user.save();

    res.json({ 
      message: 'Successfully enrolled in course',
      course: courseData
    });
  } catch (error: any) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: error.message || 'Error enrolling in course' });
  }
});

// Update course progress
router.post('/progress', verifyToken, async (req, res) => {
  try {
    const userId = (req.user as any).userId;
    const { courseTitle, progress, completedTopic } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the course in user's courses array
    const courseIndex = user.courses.findIndex(c => c.title === courseTitle);
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found in user\'s enrolled courses' });
    }

    // Update progress
    if (typeof progress === 'number') {
      user.courses[courseIndex].progress = progress;
    }

    // Add completed topic if provided and not already completed
    if (completedTopic && !user.courses[courseIndex].completedTopics.includes(completedTopic)) {
      user.courses[courseIndex].completedTopics.push(completedTopic);
    }

    // Save the updated user document
    await user.save();

    res.json({ 
      message: 'Progress updated successfully',
      course: user.courses[courseIndex]
    });
  } catch (error: any) {
    console.error('Progress update error:', error);
    res.status(500).json({ message: error.message || 'Error updating progress' });
  }
});

// Get user's course progress
router.get('/progress', verifyToken, async (req, res) => {
  try {
    const userId = (req.user as any).userId;
    const { courseTitle } = req.query;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (courseTitle) {
      // Get progress for specific course
      const course = user.courses.find(c => c.title === courseTitle);
      if (!course) {
        return res.status(404).json({ message: 'Course not found in user\'s enrolled courses' });
      }
      res.json(course);
    } else {
      // Get progress for all courses
      res.json(user.courses);
    }
  } catch (error: any) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: error.message || 'Error fetching progress' });
  }
});

export default router; 