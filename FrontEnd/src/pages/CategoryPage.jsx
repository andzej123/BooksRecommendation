import { useNavigate } from "react-router-dom";
import CategoryList from "../components/CategoryList";

const CategoryPage = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/categories/reg");
  }

  return (
    <>
      <button onClick={clickHandler}>Add Category</button>
      <button onClick={() => navigate("/homepage")}>Back</button>
      <CategoryList />
    </>
  );
};
export default CategoryPage;
