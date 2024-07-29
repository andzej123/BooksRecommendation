import { NavLink } from "react-router-dom";
import "./NavigationBar.css"

const LoginNavigationBar = () => {

  return (
    <>
      <nav className="navigationBar">
        <NavLink  to="/">
          Login
        </NavLink>
        <NavLink  to="/registration">
          Registration
        </NavLink>
      </nav>
    </>
  );
};

export default LoginNavigationBar;
