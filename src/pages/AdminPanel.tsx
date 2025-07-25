import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Course {
  courseId: string;
  title: string;
  progress: number;
  completedTopics: string[];
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  isAdmin?: boolean;
  courses: Course[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminPanel() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/users`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to load user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      fetchUsers();
    }
  }, [isAuthenticated, user]);

  const handleUserClick = (selectedUser: AdminUser) => {
    setSelectedUser(selectedUser === selectedUser ? null : selectedUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newAdmin,
          isAdmin: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to create admin user');
      }

      const data = await response.json();
      console.log('Admin created successfully:', data);

      // Clear form and refresh user list
      setNewAdmin({ name: '', email: '', password: '', mobile: '' });
      await fetchUsers();
      setError('');
    } catch (err: any) {
      console.error('Error creating admin:', err);
      setError(err.message || 'Failed to create admin user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex flex-col items-center justify-start pt-16 px-4">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">Admin Panel</h1>
      
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8">
        {/* Create Admin Section */}
        <div className="mb-12 bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Create New Admin</h2>
          <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newAdmin.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="password"
              name="password"
              value={newAdmin.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              name="mobile"
              value={newAdmin.mobile}
              onChange={handleInputChange}
              placeholder="Mobile Number (Optional)"
              className="bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Create Admin User
            </button>
          </form>
        </div>

        {/* User Management Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">User Management</h2>
            {loading && <span className="text-emerald-400">Loading...</span>}
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {users.map((user) => (
              <div 
                key={user._id}
                className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <p className="text-gray-400">{user.email}</p>
                    {user.mobile && (
                      <p className="text-gray-400 text-sm mt-1">📱 {user.mobile}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    user.isAdmin 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>

                {/* Course Progress Section */}
                <div className={`transition-all duration-300 ${
                  selectedUser?._id === user._id ? 'max-h-96' : 'max-h-0 overflow-hidden'
                }`}>
                  <div className="border-t border-gray-700 mt-4 pt-4 space-y-4">
                    <h4 className="text-white font-medium mb-3">Course Progress</h4>
                    {user.courses && user.courses.length > 0 ? (
                      user.courses.map((course) => (
                        <div key={course.courseId} className="bg-gray-900/50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-emerald-400 font-medium">{course.title}</h5>
                            <span className="text-white text-sm">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                            <div
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <div className="mt-3">
                            <h6 className="text-gray-400 text-sm mb-2">Completed Topics ({course.completedTopics.length})</h6>
                            <div className="flex flex-wrap gap-2">
                              {course.completedTopics.map((topic, index) => (
                                <span 
                                  key={index}
                                  className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-full"
                                >
                                  {topic}
                                </span>
                              ))}
                              {course.completedTopics.length === 0 && (
                                <span className="text-gray-500 text-sm">No topics completed yet</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No courses enrolled</p>
                    )}
                  </div>
                </div>

                {/* Expand/Collapse Indicator */}
                <button 
                  className={`mt-4 text-gray-400 text-sm flex items-center transition-transform duration-300 ${
                    selectedUser?._id === user._id ? 'transform rotate-180' : ''
                  }`}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                  {selectedUser?._id === user._id ? 'Show Less' : 'Show More'}
                </button>
              </div>
            ))}

            {users.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-400">
                No users found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 