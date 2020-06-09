import { Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Article } from "../../../features/articles/models";
import { RootState } from "../../../store";
import { withLoading } from "../../../utilities";
import { PaddedPaper } from "../../shared/paper";
import Body from "./body";
import Header from "./header";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export interface ArticleContentProps {
  article: Article;
}

const Details: React.FC<ArticleContentProps> = ({
  article,
}: ArticleContentProps) => {
  const classes = useStyles();

  const input = `${article.body}\n\nA tutaj dziala`;

  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.root}
    >
      <PaddedPaper>
        <Header article={article} />
        <Body article={article} />
      </PaddedPaper>
    </Grid>
  );
};

export default withLoading(Details, () => {
  const selectArticle = (state: RootState) => state.articles.selected;
  const article = useSelector(selectArticle);
  return article.isLoaded;
});
