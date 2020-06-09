/* eslint-disable react/jsx-wrap-multilines */
import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  Theme,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertContext,
  DeleteDialog,
  List,
} from "../../../components/dashboard/articles";
import SnackbarContext from "../../../components/shared/snackbar/snackbarContext";
import useAlert from "../../../customHooks/useAlert";
import useRequest from "../../../customHooks/useRequest";
import { fetchPreviewList } from "../../../features/articles/actions";
import { RootState } from "../../../store";
import { deleteArticle } from "../../../webapi";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Articles: React.FC = () => {
  const classes = useStyles();
  const [selectedArticleId, setSelectedArticleId] = useState(-1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { userName } = useSelector((state: RootState) => state.activeUser.user);
  const { method, route } = deleteArticle(selectedArticleId);
  const { makeRequest, success, error } = useRequest(method, route, true);
  const { totalCount } = useSelector(
    (state: RootState) => state.articles.previews
  );
  const { isOpen, setIsOpen, setSeverity, setText, text } = useAlert(
    "Article deleted",
    "info"
  );

  const onDialogClose = (option: boolean) => {
    setDialogOpen(false);
    if (option) {
      makeRequest();
    }
  };

  React.useEffect(() => {
    if (success) {
      setText("Article was deleted.");
      setIsOpen(true);
      dispatch(fetchPreviewList(userName as string));
    }
    if (error) {
      setText("Something went wrong.");
      setIsOpen(true);
    }
  }, [success, error]);

  React.useEffect(() => {
    dispatch(fetchPreviewList(userName as string));
  }, [userName]);

  return (
    <Grid container>
      <SnackbarContext.Provider
        value={{
          onOpen: () => setIsOpen(true),
          text: "",
          setText: (newText: string) => setText(newText),
        }}
      >
        <AlertContext.Provider
          value={{
            isOpen: isDialogOpen,
            onOpen: () => setDialogOpen(true),
            onClose: onDialogClose,
            selectedArticleId,
            selectArtcle: (newArticleId: number) =>
              setSelectedArticleId(newArticleId),
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

          <DeleteDialog articleId={selectedArticleId} />
          {totalCount > 0 && (
            <Paper className={classes.root}>
              <List />
            </Paper>
          )}
        </AlertContext.Provider>
      </SnackbarContext.Provider>
    </Grid>
  );
};

export default Articles;
