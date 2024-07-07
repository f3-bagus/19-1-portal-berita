import axios from "axios";

// Membuat instance axios dengan base URL
const instance = axios.create({
  baseURL: 'http://localhost:5000/',
});

// Fungsi untuk menghapus token dari localStorage
const handleRemoveToken = async () => {
  try {
    await localStorage.removeItem('token');
  } catch (error) {
    throw error;
  }
};

// Menambahkan interceptor request
instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menambahkan interceptor response
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleRemoveToken();
      console.error(error.response);
    }
    return Promise.reject(error);
  }
);

export default instance;
