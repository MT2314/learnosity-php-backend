import React, { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

import ConfirmationDialog from "../theme/styledComponents/ConfirmationDialog";

export const DialogContext = createContext();

const initialDialogState = {
  onConfirm: () => {},
  onCancel: () => {},
  message: "",
  title: "",
  confirmMessage: "",
};

const DialogProvider = ({
  children,
  initialState = initialDialogState,
  defaultState = false,
}) => {
  const [dialogDetails, setDialogDetails] = useState(initialState);

  const [showDialog, setShowDialog] = useState(defaultState);

  const displayDialog = useCallback(
    (
      onConfirm,
      onCancel,
      message = "",
      title = "",
      confirmMessage = "",
      cancelMessage = ""
    ) => {
      setDialogDetails({
        onConfirm,
        onCancel,
        message,
        title,
        confirmMessage,
        cancelMessage,
      });
      setShowDialog(true);
    },
    [setShowDialog]
  );

  const handleClose = () => {
    dialogDetails.onCancel?.();
    setShowDialog(false);
  };

  const onConfirm = () => {
    dialogDetails.onConfirm?.();
    setShowDialog(false);
    // setDialogDetails(initialDialogState);
  };

  const onCancel = () => {
    dialogDetails.onCancel?.();
    setShowDialog(false);
    // setDialogDetails(initialDialogState);
  };

  return (
    <DialogContext.Provider value={displayDialog}>
      <ConfirmationDialog
        open={showDialog}
        handleClose={handleClose}
        message={dialogDetails.message}
        confirmMessage={dialogDetails.confirmMessage}
        cancelMessage={dialogDetails.cancelMessage}
        title={dialogDetails.title}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      {children}
    </DialogContext.Provider>
  );
};

DialogProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  initialState: PropTypes.shape({
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    confirmMessage: PropTypes.string.isRequired,
  }),
  defaultState: PropTypes.bool,
};

DialogProvider.defaultProps = {
  initialState: initialDialogState,
  defaultState: false,
};

export default DialogProvider;
