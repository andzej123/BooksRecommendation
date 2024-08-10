import { useContext, useEffect, useState } from "react";
import "./Forms.css";
import { useForm } from "react-hook-form";
import { addComment } from "../../services/post";
import { BookContext } from "../BookDetails/BookDetails";
import { getUsernameFromToken } from "../../services/token";
import { UpdateContext } from "../../App";
import { getCommentById } from "../../services/get";
import { updateComment } from "../../services/update";
const CommentForm = ({ handleClose, state, commentId }) => {
  const [error, setError] = useState("");

  const { setUpdate } = useContext(UpdateContext);

  const [comment, setComment] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const bookId = useContext(BookContext);

  const formSubmitHandler = async (data) => {
    if (state === "Edit") {
      try {
        await updateComment(commentId, data);
        setUpdate((update) => update + 1);
        handleClose();
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const username = await getUsernameFromToken();
        const newData = {
          ...data,
          book: {
            id: bookId,
          },
          user: {
            username: username,
          },
        };
        await addComment(newData);
        setUpdate((update) => update + 1);
        reset();
        handleClose();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (state === "Edit") {
      const fetchComment = async () => {
        const response = await getCommentById(commentId);
        setComment(response);
      };
      fetchComment();
    }
  }, [commentId, state]);

  useEffect(() => {
    if (state === "Edit") {
      const { message } = comment;
      setValue("message", message, { shouldValidate: true });
    }
  }, [comment, setValue, state]);

  return (
    <>
      <form
        noValidate
        className="form commentForm"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="formInputBody">
          <textarea
            className="formInput commentFormTextArea"
            placeholder="Comment"
            {...register("message", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
            })}
          ></textarea>
          {errors.message ? (
            <p className="error">{errors.message.message}</p>
          ) : (
            ""
          )}
        </div>

        <input className="submitButton" type="submit" value="Add Comment" />
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default CommentForm;
