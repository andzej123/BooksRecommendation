import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addBook } from "../services/post";
import { updateBook } from "../services/update";
import { getAllCategories, getBookById } from "../services/get";
import { EditContext } from "../App";

const BookForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const { edit, setEdit } = useContext(EditContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const formSubmitHandler = async (data) => {
    if (edit) {
      try {
        await updateBook(id, data);
        reset();
        navigate("/homepage");
        setEdit(false);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await addBook(data);
        reset();
        navigate("/homepage");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const [book, setBook] = useState({ labas: "rytas" });
  const [categories, setCategories] = useState([]);
  const getBook = async (id) => {
    const book = await getBookById(id);
    setBook(book);
  };
  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
    if (edit) {
      getBook(id);
    }
  }, [id, edit]);

  useEffect(() => {
    if (edit) {
      const {
        name,
        description,
        isbn,
        photoLink,
        pagesCount,
        category: { id: categoryId } = {},
      } = book;
      setTimeout(() => {
        setValue("name", name, { shouldValidate: true });
        setValue("description", description);
        setValue("isbn", isbn, { shouldValidate: true });
        setValue("photoLink", photoLink);
        setValue("pagesCount", pagesCount, { shouldValidate: true });
        setValue("category.id", categoryId, { shouldValidate: true });
      }, 100);
    }
  }, [book, edit, setValue]);

  return (
    <>
      <form
        className="registrationForm"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div>
          <input
            type="text"
            placeholder="Book name"
            {...register("name", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
            })}
          />
          <p className="error">{errors.name?.message}</p>
        </div>
        <div>
          <textarea
            placeholder="Book description"
            {...register("description")}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="ISBN"
            {...register("isbn", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
            })}
          />
          <p className="error">{errors.isbn?.message}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Photo link"
            {...register("photoLink")}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Pages count"
            {...register("pagesCount", {
              required: "This field is mandatory",
              pattern: {
                value: /^\d+$/,
                message: "Input must be number",
              },
            })}
          />
          <p className="error">{errors.pagesCount?.message}</p>
        </div>
        <div>
          <select
            {...register("category.id", {
              required: "Please select a category",
            })}
          >
            <option value="">--Please choose an category--</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <p className="error">{errors.category?.id.message}</p>
        </div>

        <input
          className="submitButton"
          type="submit"
          value={edit ? "Update Book" : "Add Book"}
        />
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default BookForm;
