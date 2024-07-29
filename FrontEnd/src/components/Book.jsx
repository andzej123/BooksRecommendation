import { useContext } from "react";
import { deleteBookById } from "../services/delete";
import { EditContext, UpdateContext } from "../App";
import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const { setUpdate } = useContext(UpdateContext);
  const navigate = useNavigate();

  const { setEdit } = useContext(EditContext);

  const deleteHandler = async () => {
    try {
      await deleteBookById(book.id);
      setUpdate((update) => update + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = () => {
    setEdit(true);
    navigate(`/bookedit/${book.id}`);
  }

  return (
    <>
      <div className="cardsList">
        {book.id}
        <span>&nbsp;BOOK</span>
        <button onClick={deleteHandler}>DELETE</button>
        <button onClick={updateHandler}>UPDATE</button>
      </div>
    </>
  );
};

export default Book;
