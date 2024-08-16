import axios from "axios";
import { getUsernameFromToken } from "./token";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
  await axios.post(`${API_URL}/register`, data);
};

export const addBook = async (data) => {
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/books`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addCategory = async (data) => {
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/categories`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const addBookToFavorite = async (bookId) => {
  const token = localStorage.getItem("token");
  const username = getUsernameFromToken();
  await axios.post(
    `${API_URL}/favoritebooks/${username}/${bookId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addComment = async (data) => {
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/comments`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const rateBook = async (rating, bookId) => {
  const token = localStorage.getItem("token");
  const username = getUsernameFromToken();
  await axios.post(
    `${API_URL}/ratings/${bookId}/${username}?rating=${rating}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
