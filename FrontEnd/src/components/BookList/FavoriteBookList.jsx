import { useContext, useEffect, useState } from "react";
import { getUsersFavoriteBooks } from "../../services/get";
import FavoriteBook from "../Book/FavoriteBook";
import "./FavoriteBookList.css";
import { UpdateContext } from "../../App";

const FavoriteBookList = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [error, setError] = useState("");
  const { update } = useContext(UpdateContext);

  const fetchData = async () => {
    try {
      const data = await getUsersFavoriteBooks();
      setFavoriteBooks(data);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      <div className="favoriteBookList">
        {favoriteBooks.map((book) => {
          return <FavoriteBook key={book.id} book={book} />;
        })}
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default FavoriteBookList;
