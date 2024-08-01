import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../components/Forms/BookForm";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ButtonsBar from "../components/ButtonsBar/ButtonsBar";

const BookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const navigateBack = () => {
    if (id === undefined) {
      navigate("/homepage");
    } else {
      navigate(`/bookdetails/${id}`);
    }
  };

  return (
    <>
      <NavigationBar />
      <ButtonsBar>
        <button className="buttonBarButton" onClick={navigateBack}>
          Back
        </button>
      </ButtonsBar>
      <BookForm />
    </>
  );
};

export default BookPage;
