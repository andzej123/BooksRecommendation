import { NavLink, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { logout } from "../../services/get";
import { useEffect, useState } from "react";
import { getUserRoleFromToken } from "../../services/token";

const NavigationBar = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState();

  const getRole = async () => {
    const role = await getUserRoleFromToken();
    setRole(role);
  };

  useEffect(() => {
    getRole();
  }, []);

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navigationBar">
        <NavLink to="/homepage">Homepage</NavLink>
        {role === "ADMIN" ? <NavLink to="/categories">Categories</NavLink> : ""}
        <button className="logoutButton" onClick={logoutHandler}>
          Logout
        </button>
      </nav>
    </>
  );
};
export default NavigationBar;
