import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import BasicRating from "./BasicRating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #a1a3a6",
  boxShadow: 24,
  pb: 2,
  pt: 1,
};

export default function RatingModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="redButton padding-1em" onClick={handleOpen}>
        Rate Book
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="closeButton" onClick={handleClose}>
            X
          </div>
          <BasicRating handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
