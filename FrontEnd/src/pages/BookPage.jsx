import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";

const BookPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/homepage")}>Back</button>
      <BookForm />
    </>
  );
};

export default BookPage;
