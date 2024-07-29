import { useState } from "react";
import { checkValidToken } from "../services/token";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  const checkForToken = async () => {
    const response = await checkValidToken();
    setAuthorized(response == true);
  };
  checkForToken();

  return <div>{authorized ? children : <p>Not Authorized</p>}</div>;
};

export default ProtectedRoute;
