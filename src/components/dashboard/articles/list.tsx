import { List, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { withLoading } from "../../../utilities";
import Item from "./listItem";

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
  list: {
    width: "35vw",
  },
}));

const ArticleList: React.FC = () => {
  const classes = useStyles();
  const selectArticles = (state: RootState) => state.articles.previews.list;
  const articles = useSelector(selectArticles);

  return (
    <List style={{ flexGrow: 1 }}>
      {articles.map(item => {
        return <Item key={item.id as number} article={item} />;
      })}
    </List>
  );
};

export default withLoading(ArticleList, () => {
  const { isLoaded } = useSelector(
    (state: RootState) => state.articles.previews
  );
  return isLoaded;
});
