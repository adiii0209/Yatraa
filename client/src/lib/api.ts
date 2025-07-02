import { apiRequest } from './queryClient';

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  get: (endpoint: string) => apiRequest('GET', `${API_URL}${endpoint}`),
  post: (endpoint: string, data: unknown) => apiRequest('POST', `${API_URL}${endpoint}`, data),
  put: (endpoint: string, data: unknown) => apiRequest('PUT', `${API_URL}${endpoint}`, data),
  delete: (endpoint: string) => apiRequest('DELETE', `${API_URL}${endpoint}`),
};