import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";

const CategoryRegPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/categories")}>Back</button>
      <CategoryForm />
    </>
  );
};

export default CategoryRegPage;
