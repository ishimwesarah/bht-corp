import axios from 'axios';

const apiClient = axios.create({
  // Make sure this is the correct URL for your running backend
  baseURL: 'https://bht-backend.onrender.com/api', 
});

// This interceptor is crucial. It automatically adds the token to every request.
apiClient.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (userInfo && userInfo.token) {
      config.headers['Authorization'] = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;