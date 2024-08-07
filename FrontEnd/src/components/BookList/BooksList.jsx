import { useContext, useEffect, useState } from "react";
import {
  getAllBooks,
  getAllCategories,
  getFilteredBooksByCategory,
  getFilteredBooksByCategoryAndName,
  getFilteredBooksByName,
} from "../../services/get";
import Book from "../Book/Book";
import { UpdateContext } from "../../App";
import "./BookList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryField, setCategoryField] = useState(0);
  const [searchField, setSearchField] = useState("");

  const { update } = useContext(UpdateContext);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAllBooks();
      const cat = await getAllCategories();
      setBooks(data);
      setFilteredBooks(data);
      setCategories(cat);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [update]);

  const searchHandler = (e) => {
    setSearchField(e.target.value);
  };

  const selectHandler = (e) => {
    setCategoryField(e.target.value);
  };

  useEffect(() => {
    const filterBooks = async () => {
      if ((searchField.length > 2) & (categoryField != 0)) {
        const data = await getFilteredBooksByCategoryAndName(
          searchField,
          categoryField
        );
        setFilteredBooks(data);
      } else if (categoryField == 0 && searchField.length > 2) {
        const data = await getFilteredBooksByName(searchField);
        setFilteredBooks(data);
      } else if (
        (searchField == "" || searchField.length < 3) &&
        categoryField != 0
      ) {
        const data = await getFilteredBooksByCategory(categoryField);
        setFilteredBooks(data);
      } else {
        setFilteredBooks(books);
      }
    };
    filterBooks();
  }, [categoryField, searchField, books]);

  const resetHandler = () => {
    setCategoryField(0);
    setSearchField("");
  };

  return (
    <>
      <div className="searchBar">
        <input
          onChange={searchHandler}
          className="formInput"
          type="text"
          placeholder="Search"
          value={searchField}
        />
        <select
          onChange={selectHandler}
          value={categoryField}
          className="formInput"
        >
          <option value="0">Search by category</option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <button onClick={resetHandler} className="redButton">
          Reset
        </button>
      </div>
      <div className="bookList">
        {filteredBooks.map((book) => {
          return <Book key={book.id} book={book} />;
        })}
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default BooksList;
