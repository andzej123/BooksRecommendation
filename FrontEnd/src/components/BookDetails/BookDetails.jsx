import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  checkIfBookIsFavorited,
  getBookById,
  getBookRating,
  getBookRatingsCount,
  getCommentsQuantityByBookId,
} from "../../services/get";
import "./BookDetails.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import ButtonsBar from "../ButtonsBar/ButtonsBar";
import { getUserRoleFromToken } from "../../services/token";
import { deleteBookById, deleteBookFromFavorite } from "../../services/delete";
import { EditContext, UpdateContext } from "../../App";
import { addBookToFavorite } from "../../services/post";
import BasicModal from "../BasicModal";
import RatingModal from "../RatingModal";
import { Rating } from "@mui/material";

export const BookContext = createContext();

const BookDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const { setUpdate } = useContext(UpdateContext);
  const [error, setError] = useState("");

  const { setEdit } = useContext(EditContext);

  const [role, setRole] = useState();

  const [favorite, setFavorite] = useState(false);

  const navigate = useNavigate();

  const [book, setBook] = useState({});

  const [commentsSize, setCommentsSize] = useState(-1);

  const [rating, setRating] = useState(0);
  const [usersRated, setUsersRated] = useState(0);

  const favoriteButtonClickHandler = async () => {
    if (favorite) {
      await deleteBookFromFavorite(id);
    } else {
      await addBookToFavorite(id);
    }
    setFavorite((prevState) => !prevState);
  };

  const checkFavoriteState = async () => {
    const response = await checkIfBookIsFavorited(id);
    setFavorite(response);
  };
  checkFavoriteState();

  const getRole = async () => {
    const role = await getUserRoleFromToken();
    setRole(role);
  };

  useEffect(() => {
    getRole();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchData();
  }, [id]);

  const {
    id: bookId,
    name,
    description,
    isbn,
    photoLink,
    pagesCount,
    category: { name: categoryName } = {},
  } = book;

  const descString = "---> Description <---";

  const deleteHandler = async () => {
    try {
      await deleteBookById(id);
      setUpdate((update) => update + 1);
      navigate("/homepage");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const updateHandler = () => {
    setEdit(true);
    navigate(`/bookedit/${book.id}`);
  };

  const backButtonHandler = () => {
    if (state === "favorite") {
      navigate("/favoritebooks");
    } else {
      navigate("/homepage");
    }
  };

  const commentsClickHandler = () => {
    navigate(`/comments/${book.id}`, { state: "details" });
  };

  const fetchCommentsSize = async () => {
    try {
      const response = await getCommentsQuantityByBookId(id);
      setCommentsSize(response);
    } catch (error) {
      setError(error.message);
    }
  };
  fetchCommentsSize();

  const fetchRating = async () => {
    try {
      const response = await getBookRating(id);
      const ratingCount = await getBookRatingsCount(id);
      setRating(response);
      setUsersRated(ratingCount);
    } catch (error) {
      setError(error.message);
    }
  };
  fetchRating();

  return (
    <>
      <NavigationBar />
      <ButtonsBar>
        <button className="buttonBarButton" onClick={backButtonHandler}>
          Back
        </button>
        {role === "ADMIN" ? (
          <>
            <button className="buttonBarButton" onClick={deleteHandler}>
              Delete book
            </button>
            <button className="buttonBarButton" onClick={updateHandler}>
              Update book
            </button>
          </>
        ) : (
          ""
        )}
      </ButtonsBar>
      {error && <p className="error">{error}</p>}
      <div className="bookDetailsBody">
        <div className="bookDetailsBody-imgSide">
          <img
            src={
              photoLink == "" ? "/src/assets/images/blankbook.jpg" : photoLink
            }
            alt="book image"
          />
        </div>
        <div className="bookDetailsBody-textSide">
          <h1>{name}</h1>
          <p>
            <span>ISBN:</span> {isbn}
          </p>
          <p>
            <span>Pages Count:</span> {pagesCount}
          </p>
          <p>
            <span>Literary Genre:</span> {categoryName}
          </p>
          <button
            className="redButton padding-1em"
            onClick={favoriteButtonClickHandler}
          >
            {favorite ? "Remove from favorite" : "Add to favorite"}
          </button>
          <BookContext.Provider value={bookId}>
            <BasicModal buttonName="Add Comment" />
            <RatingModal />
          </BookContext.Provider>
          <p onClick={commentsClickHandler} className="commentsText">
            Comments({commentsSize})
          </p>
          <p>
            <span>Book Rating:</span>
            <br />
            <Rating name="read-only" value={rating} readOnly />
            <span id="usersRated">({usersRated}) users rated</span>
          </p>
        </div>
        <div className="bookDetailsBody-description">
          <h2>{descString}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
