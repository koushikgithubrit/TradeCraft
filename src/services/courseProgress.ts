import axios from 'axios';
import { authService } from './auth';

const API_URL = 'http://localhost:5000/api/courses';

export const courseProgressService = {
  enrollInCourse: async (courseTitle: string) => {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/enroll`, 
        { courseTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to enroll in course');
    }
  },

  updateProgress: async (courseTitle: string, progress: number, completedTopic?: string) => {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/progress`,
        { courseTitle, progress, completedTopic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update progress');
    }
  },

  getProgress: async (courseTitle?: string) => {
    try {
      const token = authService.getToken();
      const url = courseTitle ? `${API_URL}/progress?courseTitle=${encodeURIComponent(courseTitle)}` : `${API_URL}/progress`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
}; 