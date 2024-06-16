import axios from "axios";

const instance = axios.create({
  baseURL:  'http://localhost:5000/',
});

const handleRemoveToken = async () => {
  try {
    await localStorage.removeItem('token');
  } catch (error) {
    throw error;
  }
};

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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      handleRemoveToken();
      console.error(error.response)
    }
    return Promise.reject(error);
  }
);

export default instance;