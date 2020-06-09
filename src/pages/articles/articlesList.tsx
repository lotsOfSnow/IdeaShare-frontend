import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../../components/article/card";
import { RootState } from "../../store";
import { withLoading } from "../../utilities";

interface ArticleListProps {
  minimal?: boolean;
}

const ArticlesList: React.FC<ArticleListProps> = ({
  minimal,
}: ArticleListProps) => {
  const selectArticles = (state: RootState) => state.articles.previews.list;
  const articles = useSelector(selectArticles);

  return (
    <Grid container item spacing={2} direction="column">
      {articles.map(item => (
        <Grid key={item.id as number} item>
          <ArticleCard
            key={item.id as number}
            minimal={minimal}
            article={item}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default withLoading(ArticlesList, () => {
  const selectArticles = (state: RootState) => state.articles.previews;
  const articles = useSelector(selectArticles);
  return articles.isLoaded;
});
