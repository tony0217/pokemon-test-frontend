import { getAccessToken } from '@lib/utils/get-access-token';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.API_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 5000,
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
