import axiosInstance from "@lib/adapters/axios-adapter";
import { Favorite } from "@lib/interfaces/user.interface";

const USER_URL = '/users'

export const userService = {
  addFavorite: async (addFavoriteDto: Favorite) => {
    try {
      const response = await axiosInstance.post(`${USER_URL}/favorites`, addFavoriteDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFavoriteByUser: async () => {
    try {
      const response = await axiosInstance.get(`${USER_URL}/favorites/login`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFavorite: async (userId: string, number: string) => {
    try {
      const response = await axiosInstance.patch(`${USER_URL}/favorites/${userId}/${number}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllUser: async () => {
    try {
      const response = await axiosInstance.get(USER_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};