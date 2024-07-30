import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/Forms/CategoryForm";
import ButtonsBar from "../components/ButtonsBar/ButtonsBar";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const CategoryRegPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationBar />
      <ButtonsBar>
        <button
          className="buttonBarButton"
          onClick={() => navigate("/categories")}
        >
          Back
        </button>
      </ButtonsBar>
      <CategoryForm />
    </>
  );
};

export default CategoryRegPage;
