import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addCategory } from "../../services/post";
import { EditContext, UpdateContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategory } from "../../services/update";
import { getCategoryById } from "../../services/get";

const CategoryForm = () => {
  const [error, setError] = useState("");
  const { setUpdate } = useContext(UpdateContext);
  const navigate = useNavigate();
  const { editCategory, setEditCategory } = useContext(EditContext);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [category, setCategory] = useState({});

  const getCategory = async (id) => {
    const category = await getCategoryById(id);
    setCategory(category);
  };

  useEffect(() => {
    if (editCategory) {
      getCategory(id);
    }
  }, [id, editCategory]);

  useEffect(() => {
    if (editCategory) {
      const { name } = category;
      setTimeout(() => {
        setValue("name", name, { shouldValidate: true });
      }, 100);
    }
  }, [category, editCategory, setValue]);

  const formSubmitHandler = async (data) => {
    if (editCategory) {
      try {
        await updateCategory(id, data);
        reset();
        setEditCategory(false);
        navigate("/categories");
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await addCategory(data);
        setUpdate((update) => update + 1);
        reset();
        navigate("/categories");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <form
        className="form"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="formInputBody">
          <input
            type="text"
            className="formInput"
            placeholder="Category name"
            {...register("name", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
            })}
          />
          {errors.name ? <p className="error">{errors.name.message}</p> : ""}
        </div>
        <input
          className="submitButton"
          type="submit"
          value={editCategory ? "Update Category" : "Add Category"}
        />
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
};
export default CategoryForm;
