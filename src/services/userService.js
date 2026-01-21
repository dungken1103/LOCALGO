
import { apiClient } from "../utils/apiClient";
import axios from "axios";
const userService = {
  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user by ID: " + (error.response?.data?.message || error.message));
    }
  },
};

export default userService;