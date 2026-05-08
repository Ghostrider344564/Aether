import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const workflowApi = {
  save: (id: string, data: any) => api.put(`/workflows/${id}`, data),
  get: (id: string) => api.get(`/workflows/${id}`),
  list: () => api.get('/workflows'),
  create: (name: string) => api.post('/workflows', { name }),
};

export default api;
