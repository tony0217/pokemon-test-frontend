import axiosInstance from "@lib/adapters/axios-adapter";
import { CreateUserData, LoginUser } from "@lib/interfaces/auth.interface";

const AUTH_URL = '/auth'

export const authService = {
  async createUser(createUser: CreateUserData) {
    try {
      const response = await axiosInstance.post(`${AUTH_URL}/register`, createUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async login(loginUser: LoginUser) {
    try {
      const response = await axiosInstance.post(`${AUTH_URL}/login`, loginUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
