import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1',
  headers: { 
    'Authentication': 'Doonamis',
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejo de errores
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default http;