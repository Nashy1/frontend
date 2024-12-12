import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9193',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // Ensure this is set if you want to send cookies along with requests
});

// Request interceptor for token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Axios config loaded at:', new Date().toISOString());
        if (token) {
            console.log('Using Token:', token);
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.log('No token found in localStorage');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            alert('Access denied. Please login again.');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;