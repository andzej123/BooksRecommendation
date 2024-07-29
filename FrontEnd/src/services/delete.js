import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const deleteBookById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteCategoryById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};