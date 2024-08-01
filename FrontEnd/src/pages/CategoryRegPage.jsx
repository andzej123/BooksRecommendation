import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/Forms/CategoryForm";
import ButtonsBar from "../components/ButtonsBar/ButtonsBar";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { useContext } from "react";
import { EditContext } from "../App";

const CategoryRegPage = () => {
  const { setEditCategory } = useContext(EditContext);
  const navigate = useNavigate();

  const navigateHandler = () => {
    setEditCategory(false);
    navigate("/categories");
  };

  return (
    <>
      <NavigationBar />
      <ButtonsBar>
        <button className="buttonBarButton" onClick={navigateHandler}>
          Back
        </button>
      </ButtonsBar>
      <CategoryForm />
    </>
  );
};

export default CategoryRegPage;
