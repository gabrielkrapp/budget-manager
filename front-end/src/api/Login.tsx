import axios from "axios";
import { BASE_URL } from "../App";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (item: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, item);
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    return response.data;
  } catch (error) {
    console.error("Error logging", error);
    throw error;
  }
};
