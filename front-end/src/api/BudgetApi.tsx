import axios from "axios";
import { BASE_URL } from "../App";

export const fetchBudgetItems = async (userId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/rows?userid=${userId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the rows", error);
    throw error;
  }
};

export const updateBudgetItem = async (id: number, item: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/rows/${id}`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating the row", error);
    throw error;
  }
};

export const addBudgetItem = async (item: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/rows`, item);
    return response.data;
  } catch (error) {
    console.error("Error adding a new row", error);
    throw error;
  }
};

export const deleteBudgetItem = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/rows/${id}`);
  } catch (error) {
    console.error("Error deleting the row", error);
    throw error;
  }
};
