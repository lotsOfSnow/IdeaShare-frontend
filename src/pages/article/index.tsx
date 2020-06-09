import { Divider, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ArticleDetails from "../../components/article/details";
import CommentSection from "../../components/comment/section";
import { fetchArticle } from "../../features/articles/actions";
import { fetchArticleComments } from "../../features/comments/actions";
import { RootState } from "../../store";

interface RouteParams {
  id: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Article: React.FC<RouteParams> = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectArticle = (state: RootState) => state.articles.selected;
  const article = useSelector(selectArticle);
  const comments = useSelector((state: RootState) => state.comments.list);
  const classes = useStyles();
  const isAuthenticated = useSelector(
    (state: RootState) => state.activeUser.user
  ).isLoaded;

  useEffect(() => {
    dispatch(fetchArticle(id));
    dispatch(fetchArticleComments(id));
  }, [id]);

  return (
    <>
      <Grid container direction="column">
        <ArticleDetails article={article} />
        <Divider style={{ marginTop: "15px", marginBottom: "5px" }} />
        <CommentSection />
      </Grid>
    </>
  );
};

export default Article;
