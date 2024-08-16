import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { BookContext } from "./BookDetails/BookDetails";
import { rateBook } from "../services/post";
import { UpdateContext } from "../App";
import { checkIfUserAlreadyRankedBook } from "../services/get";

export default function BasicRating({ handleClose }) {
  const [value, setValue] = React.useState(0);

  const bookId = React.useContext(BookContext);

  const [error, setError] = React.useState("");

  const { setUpdate } = React.useContext(UpdateContext);

  const [alreadyRated, setAlreadyRated] = React.useState(false);

  const clickHandler = async () => {
    try {
      if (value === 0) {
        setError("Value must be selected");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        await rateBook(value, bookId);
        setUpdate((update) => update + 1);
        handleClose();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await checkIfUserAlreadyRankedBook(bookId);
      setAlreadyRated(response);
    } catch (error) {
      setError(error.message);
    }
  };
  fetchData();

  const styled = {
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
  };

  const ratedWarning = {
    color: "red",
    fontSize: "0.8rem",
    marginInline: "2em",
  };

  const width125 = {
    width: 125,
  };

  return (
    <Box
      sx={
        ({
          "& > legend": { mt: 2, mb: 2, fontWeight: "bold" },
        },
        styled)
      }
    >
      {error && <p className="error">{error}</p>}
      {alreadyRated && (
        <p style={ratedWarning}>
          You already rated this book, but you can change your previous rating
        </p>
      )}
      <Typography component="legend">Choose your rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <br />
      <button style={width125} className="submitButton" onClick={clickHandler}>
        Rate
      </button>
    </Box>
  );
}
