import { useContext, useEffect, useState } from "react";
import { EditContext, UpdateContext } from "../App";
import { deleteCategoryById } from "../services/delete";
import { getAllCategories } from "../services/get";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const { update, setUpdate } = useContext(UpdateContext);
  const [categories, setCategories] = useState([]);
  const { setEditCategory } = useContext(EditContext);
  const navigate = useNavigate();

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
      console.log(error);
    }
  };

  const updateHandler = (id) => {
    setEditCategory(true);
    navigate(`/categoryedit/${id}`);
  }

  return (
    <>
      {categories.map((category) => {
        return (
          <div className="categoryField" key={category.id}>
            {category.name} &nbsp;
            <button onClick={() => deleteHandler(category.id)}>DELETE</button>
            <button onClick={() => updateHandler(category.id)}>UPDATE</button>
          </div>
        );
      })}
    </>
  );
};
export default CategoryList;
