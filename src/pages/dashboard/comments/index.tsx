/* eslint-disable react/jsx-wrap-multilines */
import { Grid, IconButton, Snackbar } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import List from "../../../components/comment/list";
import SnackbarContext from "../../../components/shared/snackbar/snackbarContext";
import useAlert from "../../../customHooks/useAlert";
import { fetchCommentsForUser } from "../../../features/comments/actions";

const Comments: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, setIsOpen, setSeverity, setText, text } = useAlert(
    "Comment deleted",
    "info"
  );

  React.useEffect(() => {
    dispatch(fetchCommentsForUser());
  }, []);

  return (
    <SnackbarContext.Provider
      value={{
        onOpen: () => setIsOpen(true),
        text: "",
        setText: (newText: string) => setText(newText),
      }}
    >
      <Grid container item style={{ flexGrow: 1 }}>
        <Snackbar
          open={isOpen}
          onClose={() => setIsOpen(false)}
          message={text}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />

        <List />
      </Grid>
    </SnackbarContext.Provider>
  );
};

export default Comments;
