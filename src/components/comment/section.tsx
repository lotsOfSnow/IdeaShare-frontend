/* eslint-disable react/jsx-wrap-multilines */
import { Grid, IconButton, Snackbar, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import useAlert from "../../customHooks/useAlert";
import { RootState } from "../../store";
import SnackbarContext from "../shared/snackbar/snackbarContext";
import CommentForm from "./form";
import CommentList from "./list";

const Section: React.FC = () => {
  const selectArticle = (state: RootState) => state.articles.selected;
  const article = useSelector(selectArticle);
  const comments = useSelector((state: RootState) => state.comments.list);
  const isAuthenticated = useSelector((state: RootState) => state.activeUser)
    .user.isLoaded;
  const { isOpen, setIsOpen, setSeverity, setText, text } = useAlert(
    "Comment deleted",
    "info"
  );

  const getText = () => {
    const count = comments.length;
    if (count === 1) {
      return `${count} comment`;
    }
    if (count > 1) {
      return `${count} comments`;
    }

    return "No comments yet";
  };

  return (
    <SnackbarContext.Provider
      value={{
        onOpen: () => setIsOpen(true),
        text: "",
        setText: (newText: string) => setText(newText),
      }}
    >
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

      <Grid container item spacing={2} direction="column">
        <Typography color="textSecondary" variant="h3">
          {getText()}
        </Typography>
        {isAuthenticated && (
          <Grid item>
            <CommentForm articleId={article.id as number} />
          </Grid>
        )}

        <CommentList />
      </Grid>
    </SnackbarContext.Provider>
  );
};

export default Section;
