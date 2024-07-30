import { useContext } from "react";
import { deleteBookById } from "../../services/delete";
import { EditContext, UpdateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./Book.css";
import ButtonsBar from "../ButtonsBar/ButtonsBar";

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
  };

  console.log(book.photoLink);

  return (
    <>
      <div className="singleBookBody">
        <div className="singleBook">
          <div>
            <img src={book.photoLink} alt="book image" />
          </div>
          <div className="singleBookTextSide">
            <h1>{book.name}</h1>
            <p className="lalala">{book.description}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Pages count: {book.pagesCount}</p>
            <p>Book genre: {book.category.name}</p>
          </div>
        </div>
        <ButtonsBar>
          <button className="buttonBarButton" onClick={deleteHandler}>DELETE</button>
          <button className="buttonBarButton" onClick={updateHandler}>UPDATE</button>
        </ButtonsBar>
      </div>
    </>
  );
};

export default Book;
