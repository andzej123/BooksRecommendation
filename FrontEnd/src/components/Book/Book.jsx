import { useNavigate } from "react-router-dom";
import "./Book.css";
import { useState } from "react";
import { deleteBookFromFavorite } from "../../services/delete";
import { addBookToFavorite } from "../../services/post";
import {
  checkIfBookIsFavorited,
  getBookRating,
  getCommentsQuantityByBookId,
} from "../../services/get";
import Heart from "react-heart";
import { Rating } from "@mui/material";

const Book = ({ book }) => {
  const [active, setActive] = useState(false);

  const [rating, setRating] = useState(0);

  const [commentsSize, setCommentsSize] = useState(-1);

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/bookdetails/${book.id}`);
  };

  const favoriteButtonClickHandler = async () => {
    if (active) {
      await deleteBookFromFavorite(book.id);
    } else {
      await addBookToFavorite(book.id);
    }
    setActive(!active);
  };

  const heartClickHandler = (e) => {
    e.stopPropagation();
  };

  const checkFavoriteState = async () => {
    const response = await checkIfBookIsFavorited(book.id);
    setActive(response);
  };
  checkFavoriteState();

  const commentsClickHandler = (e) => {
    e.stopPropagation();
    navigate(`/comments/${book.id}`);
  };

  const fetchCommentsSize = async () => {
    const response = await getCommentsQuantityByBookId(book.id);
    setCommentsSize(response);
  };
  fetchCommentsSize();

  const fetchRating = async () => {
    try {
      const response = await getBookRating(book.id);
      setRating(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  fetchRating();

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
          <div
            className="heartBody"
            onClick={heartClickHandler}
            style={{ width: "1.5rem" }}
          >
            <Heart isActive={active} onClick={favoriteButtonClickHandler} />
          </div>
          <p onClick={commentsClickHandler} className="commentsText">
            Comments({commentsSize})
          </p>
          <Rating name="read-only" value={rating} readOnly />
        </div>
      </div>
    </>
  );
};

export default Book;
