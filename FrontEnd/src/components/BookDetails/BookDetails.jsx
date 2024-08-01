import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../../services/get";
import "./BookDetails.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import ButtonsBar from "../ButtonsBar/ButtonsBar";
import { getUserRoleFromToken } from "../../services/token";
import { deleteBookById } from "../../services/delete";
import { EditContext, UpdateContext } from "../../App";

const BookDetails = () => {
  const { id } = useParams();

  const { setUpdate } = useContext(UpdateContext);
  const [error, setError] = useState("");

  const { setEdit } = useContext(EditContext);

  const [role, setRole] = useState();

  const getRole = async () => {
    const role = await getUserRoleFromToken();
    setRole(role);
  };

  useEffect(() => {
    getRole();
  }, []);

  const navigate = useNavigate();

  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchData();
  }, [id]);

  const {
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

  return (
    <>
      <NavigationBar />
      <ButtonsBar>
        <button
          className="buttonBarButton"
          onClick={() => navigate("/homepage")}
        >
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
