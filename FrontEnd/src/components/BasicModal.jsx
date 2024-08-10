import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommentForm from "./Forms/CommentForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #a1a3a6",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ buttonName, commentId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="redButton padding-1em" onClick={handleOpen}>
        {buttonName}
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
          <CommentForm
            state={buttonName}
            handleClose={handleClose}
            commentId={commentId}
          />
        </Box>
      </Modal>
    </div>
  );
}
