"use client"

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  price: number;
  image: string;
}

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Stock Market',
      description: 'Learn the fundamentals of stock market trading, including market basics, terminology, and essential concepts.',
      level: 'Beginner',
      duration: '8 weeks',
      lessons: 24,
      price: 99,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '2',
      title: 'Technical Analysis Mastery',
      description: 'Master technical analysis techniques, chart patterns, and indicators for better trading decisions.',
      level: 'Intermediate',
      duration: '10 weeks',
      lessons: 32,
      price: 149,
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: '3',
      title: 'Advanced Trading Strategies',
      description: 'Learn advanced trading strategies, risk management, and portfolio optimization techniques.',
      level: 'Advanced',
      duration: '12 weeks',
      lessons: 36,
      price: 199,
      image: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
  ];

  const filteredCourses = selectedLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  return (
    <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Courses</h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose from our comprehensive range of stock market trading courses
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedLevel === level
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500 text-white">
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-300 mb-4">{course.description}</p>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>{course.duration}</span>
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">${course.price}</span>
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-400">
              No courses found for the selected level
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses
