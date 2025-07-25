import express from 'express';
import { verifyToken } from './auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    // For now, return static course data
    const courses = [
      {
        id: '1',
        title: 'Introduction to Stock Market',
        description: 'Learn the fundamentals of stock market trading.',
        level: 'Beginner',
        duration: '8 weeks',
        lessons: 24,
        price: 99,
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3'
      },
      {
        id: '2',
        title: 'Technical Analysis Mastery',
        description: 'Master technical analysis techniques.',
        level: 'Intermediate',
        duration: '10 weeks',
        lessons: 32,
        price: 149,
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f'
      },
      {
        id: '3',
        title: 'Advanced Trading Strategies',
        description: 'Learn advanced trading strategies.',
        level: 'Advanced',
        duration: '12 weeks',
        lessons: 36,
        price: 199,
        image: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c'
      }
    ];

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get user's enrolled courses
router.get('/enrolled', verifyToken, async (req, res) => {
  try {
    // For now, return static enrolled course data
    const enrolledCourses = [
      {
        id: '1',
        title: 'Introduction to Stock Market',
        progress: 30,
        lastAccessed: new Date()
      }
    ];

    res.json(enrolledCourses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = {
      id,
      title: 'Introduction to Stock Market',
      description: 'Learn the fundamentals of stock market trading.',
      level: 'Beginner',
      duration: '8 weeks',
      lessons: 24,
      price: 99,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3'
    };

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

export default router; 