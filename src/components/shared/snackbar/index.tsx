import { Snackbar, SnackbarProps } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";
import React from "react";

interface MySnackbarProps extends SnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  severity?: Color;
}

const MySnackbar: React.FC<MySnackbarProps> = ({
  isOpen,
  text,
  severity,
  onClose,
  anchorOrigin,
}: MySnackbarProps) => {
  const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      message={severity ? "" : text}
    >
      {severity && (
        <Alert onClose={handleClose} severity={severity}>
          {text}
        </Alert>
      )}
    </Snackbar>
  );
};

export default MySnackbar;
