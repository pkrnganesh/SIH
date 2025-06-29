import axios from 'axios';
import SessionManager from '../utils/sessionManager';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor to include auth headers
apiClient.interceptors.request.use(
  (config) => {
    const token = SessionManager.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      SessionManager.clearSession();
      window.location.href = '/student-login';
    }
    return Promise.reject(error);
  }
);

// Resume API methods
export const resumeAPI = {
  // Get all templates
  getTemplates: () => apiClient.get('/api/resume/templates'),
  
  // Get user resumes
  getUserResumes: () => apiClient.get('/api/resume/user'),
  
  // Get specific resume
  getResume: (resumeId) => apiClient.get(`/api/resume/${resumeId}`),
  
  // Create new resume
  createResume: (resumeData) => apiClient.post('/api/resume', resumeData),
  
  // Update resume
  updateResume: (resumeId, resumeData) => apiClient.put(`/api/resume/${resumeId}`, resumeData),
  
  // Delete resume
  deleteResume: (resumeId) => apiClient.delete(`/api/resume/${resumeId}`),
  
  // Duplicate resume
  duplicateResume: (resumeId) => apiClient.post(`/api/resume/${resumeId}/duplicate`),
  
  // Download resume
  downloadResume: (resumeId, format = 'html') => 
    apiClient.get(`/api/resume/${resumeId}/download?format=${format}`, {
      responseType: format === 'html' ? 'blob' : 'json'
    }),
  
  // Preview resume
  previewResume: (resumeId) => apiClient.get(`/api/resume/${resumeId}/preview`)
};

export default apiClient;
