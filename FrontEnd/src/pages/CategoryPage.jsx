import { useNavigate } from "react-router-dom";
import CategoryList from "../components/CategoryList/CategoryList";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ButtonsBar from "../components/ButtonsBar/ButtonsBar";

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <ButtonsBar>
        <button
          className="buttonBarButton"
          onClick={() => navigate("/newcategory")}
        >
          Add Category
        </button>
      </ButtonsBar>
      <CategoryList />
    </>
  );
};
export default CategoryPage;
