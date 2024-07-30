import { useNavigate } from "react-router-dom";
import BookForm from "../components/Forms/BookForm";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ButtonsBar from "../components/ButtonsBar/ButtonsBar";

const BookPage = () => {
  const navigate = useNavigate();
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
      </ButtonsBar>
      <BookForm />
    </>
  );
};

export default BookPage;
