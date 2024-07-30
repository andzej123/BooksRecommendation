import { useNavigate } from "react-router-dom";
import BooksList from "../components/BookList/BooksList";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { useContext } from "react";
import { EditContext } from "../App";
import ButtonsBar from "../components/ButtonsBar/ButtonsBar";

const HomePage = () => {
  const navigate = useNavigate();
  const { setEdit } = useContext(EditContext);

  const navigateHandler = () => {
    setEdit(false);
    navigate("/bookpage");
  };

  return (
    <>
      <NavigationBar />
      <ButtonsBar>
        <button className="buttonBarButton" onClick={navigateHandler}>
          Add New Book
        </button>
      </ButtonsBar>
      <BooksList />
    </>
  );
};

export default HomePage;
