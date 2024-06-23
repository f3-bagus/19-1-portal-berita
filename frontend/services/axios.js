import axios from "axios";

const instance = axios.create({
  baseURL:  'https://api-msib-6-portal-berita-01.educalab.id/',
});
// Fungsi untuk menghapus token dari localStorage
const handleRemoveToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Interceptor untuk menambahkan token ke setiap permintaan jika tersedia
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani respons
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleRemoveToken();
      console.error('Unauthorized, token removed:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;
