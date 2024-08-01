import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

export const checkValidToken = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/valid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error at checkValidToken method: " + error);
  }
};

export const getUserRoleFromToken = () => {
  const token = localStorage.getItem("token");
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
