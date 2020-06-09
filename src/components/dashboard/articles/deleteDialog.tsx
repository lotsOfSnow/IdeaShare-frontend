import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useContext } from "react";
import { AlertContext } from ".";

interface DeleteDialogProps {
  articleId: number;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  articleId,
}: DeleteDialogProps) => {
  const { isOpen, onClose } = useContext(AlertContext);

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose(false)}
      style={{ bottom: "50%" }}
    >
      <DialogTitle>Delete article?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete selected article? This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClose(false)}
        >
          No
        </Button>
        <Button
          variant="outlined"
          style={{ color: "red" }}
          onClick={() => onClose(true)}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
