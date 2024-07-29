import axios from "axios";

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
    console.log("error at token valid" + error);
  }
};
