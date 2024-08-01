import { useContext, useEffect, useState } from "react";
import { EditContext, UpdateContext } from "../../App";
import { deleteCategoryById } from "../../services/delete";
import { getAllCategories } from "../../services/get";
import { useNavigate } from "react-router-dom";
import "./CategoryList.css";
import ButtonsBar from "../ButtonsBar/ButtonsBar";

const CategoryList = () => {
  const { update, setUpdate } = useContext(UpdateContext);
  const [categories, setCategories] = useState([]);
  const { setEditCategory } = useContext(EditContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };
  useEffect(() => {
    getCategories();
  }, [update]);

  const deleteHandler = async (id) => {
    try {
      await deleteCategoryById(id);
      setUpdate((update) => update + 1);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateHandler = (id) => {
    setEditCategory(true);
    navigate(`/categoryedit/${id}`);
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      {categories.map((category) => {
        return (
          <div className="singleCategory" key={category.id}>
            {category.name} &nbsp;
            <ButtonsBar>
              <button
                className="buttonBarButton"
                onClick={() => deleteHandler(category.id)}
              >
                DELETE
              </button>
              <button
                className="buttonBarButton"
                onClick={() => updateHandler(category.id)}
              >
                UPDATE
              </button>
            </ButtonsBar>
          </div>
        );
      })}
    </>
  );
};
export default CategoryList;
