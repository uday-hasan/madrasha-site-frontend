// API Client - Currently using fake data
// Uncomment axios setup when Express backend is ready

// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     // Add auth token if exists
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Redirect to login
//       window.location.href = '/admin/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

// Fake API delay helper
export const fakeDelay = (ms = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
