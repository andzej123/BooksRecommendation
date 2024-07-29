import { useNavigate } from "react-router-dom";
import BooksList from "../components/BooksList";
import { EditContext } from "../App";
import { useContext } from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const HomePage = () => {
  const navigate = useNavigate();
  const { setEdit } = useContext(EditContext);

  const navigateHandler = () => {
    setEdit(false);
    navigate("/bookpage");
  };

  const navigateHandlerCategory = () => {
    setEdit(false);
    navigate("/categories");
  };

  return (
    <>
      <NavigationBar />
      <button onClick={navigateHandler}>Add New Book</button>
      <button onClick={navigateHandlerCategory}>Categories</button>
      <BooksList />
    </>
  );
};

export default HomePage;
