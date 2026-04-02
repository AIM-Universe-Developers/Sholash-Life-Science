import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000'
});

// Optional: Add request interceptor for tokens
api.interceptors.request.use(config => {
    const adminToken = localStorage.getItem('sholash_admin_token');
    const userToken = JSON.parse(localStorage.getItem('user'))?.token;
    const token = adminToken || userToken;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
