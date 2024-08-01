import { useNavigate } from "react-router-dom";
import BooksList from "../components/BookList/BooksList";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { useContext, useEffect, useState } from "react";
import { EditContext } from "../App";
import ButtonsBar from "../components/ButtonsBar/ButtonsBar";
import { getUserRoleFromToken } from "../services/token";

const HomePage = () => {
  const navigate = useNavigate();
  const { setEdit } = useContext(EditContext);

  const [role, setRole] = useState();

  const getRole = async () => {
    const role = await getUserRoleFromToken();
    setRole(role);
  };

  useEffect(() => {
    getRole();
  }, []);

  const navigateHandler = () => {
    setEdit(false);
    navigate("/bookpage");
  };

  return (
    <>
      <NavigationBar />
      {role === "ADMIN" ? (
        <ButtonsBar>
          <button className="buttonBarButton" onClick={navigateHandler}>
            Add New Book
          </button>
        </ButtonsBar>
      ) : (
        ""
      )}
      <BooksList />
    </>
  );
};

export default HomePage;
