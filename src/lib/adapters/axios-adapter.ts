import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.API_URL;

const storedUserInfo = localStorage.getItem('userInfo');
const userInfo: any | null = storedUserInfo ? JSON.parse(storedUserInfo) : null;
const accessToken = userInfo?.token || '';

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
