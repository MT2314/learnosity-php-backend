import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmDialog = (removeConfirm, setRemoveConfirm) => {
  return (
    <Dialog open={removeConfirm} onClose={() => setRemoveConfirm(false)}>
      <DialogTitle>This is mny Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to delete</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
