
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
});

const handleRemoveToken = async () => {
  try {
    await localStorage.removeItem('token');
  } catch (error) {
    throw error;
  }
};

instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization Header:', config.headers['Authorization']);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
  }
  );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       handleRemoveToken();
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;