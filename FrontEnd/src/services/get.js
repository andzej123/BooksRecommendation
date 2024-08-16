import axios from "axios";
import { getUsernameFromToken } from "./token";

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
  const response = await axios.get(
    `${API_URL}/books/searchcategoryandname?name=${name}&id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const checkIfBookIsFavorited = async (bookId) => {
  const token = localStorage.getItem("token");
  const username = getUsernameFromToken();
  const response = await axios.get(
    `${API_URL}/favoritebooks/${username}/${bookId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUsersFavoriteBooks = async () => {
  const token = localStorage.getItem("token");
  const username = getUsernameFromToken();
  const response = await axios.get(
    `${API_URL}/user/${username}/favoritebooks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getCommentsByBookId = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCommentsQuantityByBookId = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/comments/${id}/length`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCommentById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBookRating = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/ratings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const checkIfUserAlreadyRankedBook = async (bookId) => {
  const token = localStorage.getItem("token");
  const username = getUsernameFromToken();
  const response = await axios.get(`${API_URL}/ratings/${bookId}/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBookRatingsCount = async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/ratings/${bookId}/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


