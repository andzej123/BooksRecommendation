import { useContext, useState } from "react";
import "./Comment.css";
import { getUsernameFromToken } from "../../services/token";
import { deleteCommentById } from "../../services/delete";
import { UpdateContext } from "../../App";
import BasicModal from "../BasicModal";

const Comment = ({ comment }) => {
  const { id, username, message } = comment;

  const [error, setError] = useState("");

  const { setUpdate } = useContext(UpdateContext);

  const [user, setUser] = useState("");

  const fetchData = async () => {
    const response = await getUsernameFromToken();
    setUser(response);
  };
  fetchData();

  const deleteHandler = async () => {
    try {
      await deleteCommentById(id);
      setUpdate((update) => update + 1);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="singleComment">
        <div className="commentButtons">
          {username === user ? (
            <BasicModal buttonName="Edit" commentId={id} />
          ) : (
            ""
          )}
          {username === user || user === "admin" ? (
            <p onClick={deleteHandler} className="closeButton">
              X
            </p>
          ) : (
            ""
          )}
        </div>
        <h2>{username}</h2>
        <p className="singleCommentText">{message}</p>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Comment;
