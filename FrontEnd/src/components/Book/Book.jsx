import { useNavigate } from "react-router-dom";
import "./Book.css";

const Book = ({ book }) => {

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/bookdetails/${book.id}`)
  }

  return (
    <>
      <div className="singleBook" onClick={clickHandler}>
        <div>
          <img
            src={
              book.photoLink == ""
                ? "src/assets/images/blankbook.jpg"
                : book.photoLink
            }
            alt="book image"
          />
        </div>
        <div className="singleBookTextSide">
          <p>{book.name}</p>
          <p>{book.category.name}</p>
        </div>
      </div>
    </>
  );
};

export default Book;
