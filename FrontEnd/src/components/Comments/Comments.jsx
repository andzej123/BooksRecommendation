import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Comments.css";
import { useContext, useEffect, useState } from "react";
import { getBookById, getCommentsByBookId } from "../../services/get";
import Comment from "../Comment/Comment";
import ButtonsBar from "../ButtonsBar/ButtonsBar";
import { UpdateContext } from "../../App";
import BasicModal from "../BasicModal";
import { BookContext } from "../BookDetails/BookDetails";

const Comments = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});

  const [comments, setComments] = useState([]);

  const { update } = useContext(UpdateContext);

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCommentsByBookId(id);
      setComments(data);
      const bookData = await getBookById(id);
      setBook(bookData);
    };
    fetchData();
  }, [id, update]);

  const backButtonHandler = () => {
    if (state === "details") {
      navigate(`/bookdetails/${id}`);
    } else {
      navigate("/homepage");
    }
  };

  return (
    <>
      <ButtonsBar>
        <button className="buttonBarButton" onClick={backButtonHandler}>
          Back
        </button>
        <BookContext.Provider value={id}>
          <BasicModal buttonName="Add Comment" />
        </BookContext.Provider>
      </ButtonsBar>
      <div className="commentsList">
        <h1>{book.name}</h1>
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </>
  );
};

export default Comments;
