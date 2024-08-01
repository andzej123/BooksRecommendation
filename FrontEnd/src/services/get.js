import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllBooks = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBookById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCategoryById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllCategories = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFilteredBooksByName = async (name) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/books/search?name=${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFilteredBooksByCategory = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/books/searchcategory?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFilteredBooksByCategoryAndName = async (name, id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/books/searchcategoryandname?name=${name}&id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
