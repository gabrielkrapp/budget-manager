import axios from "axios";
import { BASE_URL } from "../App";

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (item: RegisterData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, item);
        return response.data;
    } catch (error) {
        console.error("Error adding a new user", error);
        throw error;
    }
};