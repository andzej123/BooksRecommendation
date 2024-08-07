import { useNavigate } from "react-router-dom";
import "./FavoriteBook.css";
import { deleteBookFromFavorite } from "../../services/delete";
import { useContext } from "react";
import { UpdateContext } from "../../App";
const FavoriteBook = ({ book }) => {
  const { id, name, photoLink } = book;
  const navigate = useNavigate();

  const { setUpdate } = useContext(UpdateContext);

  const detailsHandler = () => {
    navigate(`/bookdetails/${id}`, { state: "favorite" });
  };

  const deleteHandler = async () => {
    await deleteBookFromFavorite(id);
    setUpdate((update) => update + 1);
  };

  return (
    <>
      <div className="favoriteBookBody">
        <img
          src={photoLink == "" ? "src/assets/images/blankbook.jpg" : photoLink}
          alt="book image"
        />
        <p>{name}</p>
        <button className="redButton padding-1em" onClick={detailsHandler}>Details</button>
        <button className="redButton padding-1em" onClick={deleteHandler}>Delete from favorite</button>
      </div>
    </>
  );
};

export default FavoriteBook;
