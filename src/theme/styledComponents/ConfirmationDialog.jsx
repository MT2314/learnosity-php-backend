import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import {
  Button as MUIButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Button = styled(MUIButton)({
  fontFamily: "Inter",
  fontSize: "14px",
  letterSpacing: "0.4px",
  lineHeight: "24px",
  color: "#1565C0 !important",
  paddingTop: "6px !important",
  paddingBottom: "6px !important",
  paddingLeft: "8px !important",
  paddingRight: "8px !important",
});

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
    sx={{
      "& .MuiPaper-root": {
        width: "444px",
        borderRadius: "4px",
        boxShadow:
          "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
      },
    }}
  >
    <DialogTitle
      id="alert-dialog-title"
      sx={{
        fontFamily: "Inter",
        fontSize: "18px",
        lineHeight: "160%",
        letterSpacing: "0.15px",
        color: "#232323",
        "&+.MuiDialogContent-root": {
          paddingTop: "8px !important",
          paddingBottom: "8px !important",
        },
      }}
    >
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        id="alert-dialog-description"
        sx={{
          fontFamily: "Inter",
          fontSize: "16px",
          letterSpacing: "0.15px",
          color: "#232323",
        }}
      >
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm} autoFocus>
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
