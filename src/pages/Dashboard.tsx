import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules } from '../data/modules';
import { courseProgressService } from '../services/courseProgress';

interface PurchasedCourse {
  courseId: string;
  purchaseDate: string;
  status: string;
}

const COURSE_TITLE = "Beginner to Pro Trader";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [readPages, setReadPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);

  // Get user progress from API
  const fetchUserProgress = async () => {
    try {
      // Try to get progress first
      const progress = await courseProgressService.getProgress(COURSE_TITLE);
      if (progress) {
        setProgressPercent(progress.progress || 0);
        setReadPages(progress.completedTopics?.length || 0);
        setTotalPages(modules.reduce((sum, m) => sum + m.lessons.length, 0));
      }
    } catch (error: any) {
      // If error is 404 (not found), try to enroll user
      if (error.message.includes('not found')) {
        try {
          await courseProgressService.enrollInCourse(COURSE_TITLE);
          // After enrollment, fetch progress again
          const progress = await courseProgressService.getProgress(COURSE_TITLE);
          if (progress) {
            setProgressPercent(progress.progress || 0);
            setReadPages(progress.completedTopics?.length || 0);
            setTotalPages(modules.reduce((sum, m) => sum + m.lessons.length, 0));
          }
        } catch (enrollError: any) {
          console.error('Error enrolling in course:', enrollError);
          setError(enrollError.message);
        }
      } else {
        console.error('Error fetching progress:', error);
        setError(error.message);
      }
    }
  };

  const fetchPurchasedCourses = async () => {
    try {
      const response = await fetch('/api/payment/purchased-courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch purchased courses');
      }

      const courses = await response.json();
      setPurchasedCourses(courses);
    } catch (error: any) {
      console.error('Error fetching purchased courses:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    Promise.all([
      fetchUserProgress(),
      fetchPurchasedCourses()
    ]).finally(() => setLoading(false));
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome, {user?.name}</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/20 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{COURSE_TITLE}</h3>
            <p className="text-gray-400 mb-4">Track your real progress across all modules and lessons.</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-300 mb-2">
              Topics completed: {readPages} / {totalPages}
            </div>
            <button
              onClick={() => navigate('/trading-course')}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Continue Learning
            </button>
          </motion.div>

          {/* Purchased Courses */}
          {purchasedCourses.map((course) => (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {course.courseId === '1' ? 'Introduction to Stock Market' :
                 course.courseId === '2' ? 'Technical Analysis Mastery' :
                 'Advanced Trading Strategies'}
              </h3>
              <p className="text-gray-400 mb-4">
                Purchased on {new Date(course.purchaseDate).toLocaleDateString()}
              </p>
              <div className="text-sm text-gray-300 mb-4">
                Status: <span className="text-emerald-400">{course.status}</span>
              </div>
              <button
                onClick={() => navigate('/trading-course')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Start Learning
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 