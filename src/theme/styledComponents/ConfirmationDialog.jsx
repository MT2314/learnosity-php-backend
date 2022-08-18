import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// Shows fullscreen confirmation, takes two callbacks to run on confirm or cancel
const ConfirmationDialog = ({
  open,
  handleClose,
  onConfirm,
  onCancel,
  title,
  message,
  confirmMessage = "Confirm",
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="secondary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="secondary" autoFocus>
        {confirmMessage}
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmMessage: PropTypes.string,
};

export default ConfirmationDialog;
