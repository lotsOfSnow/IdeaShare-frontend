import { Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../store";
import LikeButton from "./likeArticleButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    marginTop: 20,
    marginLeft: 20,
  },
}));

const ActionButtons: React.FC = () => {
  const classes = useStyles();
  const userLoaded = useSelector(
    (state: RootState) => state.activeUser.user.isLoaded
  );
  const article = useSelector((state: RootState) => state.articles.selected);
  const location = useLocation();
  const onArticlePage = () => {
    return article.isLoaded && location.pathname === `/articles/${article.id}`;
  };

  return (
    <Grid item className={classes.root}>
      {onArticlePage() && userLoaded && (
        <LikeButton articleId={article.id as number} />
      )}
    </Grid>
  );
};

export default ActionButtons;
