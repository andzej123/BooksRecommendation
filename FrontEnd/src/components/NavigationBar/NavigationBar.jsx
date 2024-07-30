import { NavLink, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { logout } from "../../services/get";

const NavigationBar = () => {

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  }

  return (
    <>
      <nav className="navigationBar">
        <NavLink to="/homepage">Homepage</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <button className="logoutButton" onClick={logoutHandler}>Logout</button>
      </nav>
    </>
  );
};
export default NavigationBar;
