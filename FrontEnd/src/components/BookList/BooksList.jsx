import { useContext, useEffect, useState } from "react";
import { getAllBooks } from "../../services/get";
import Book from "../Book/Book";
import { UpdateContext } from "../../App";
import "./BookList.css"

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const { update } = useContext(UpdateContext);

  const fetchData = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.log("error at get books" + error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      <div className="bookList">
        {books.map((book) => {
          return <Book key={book.id} book={book} />;
        })}
      </div>
    </>
  );
};

export default BooksList;
