import { Grid, Paper, useMediaQuery } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setPage } from "../../features/articles/actions";
import { RootState } from "../../store";
import theme from "../../styles/Theme";
import { getPaginationPagesCount } from "../../utilities";

const ArticlesPagination: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectConfig = (state: RootState) => state.articles.config;
  const selectArticles = (state: RootState) => state.articles.previews;
  const { page, perPage } = useSelector(selectConfig);
  const { totalCount } = useSelector(selectArticles);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (page === value) {
      return;
    }
    dispatch(setPage(value, history));

    // dispatch(fetchPreviewList());
  };

  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const count = getPaginationPagesCount(perPage, totalCount);

  return (
    <Grid container justify="center">
      <Paper>
        <Pagination
          count={count}
          page={page}
          size={matches ? "small" : "medium"}
          onChange={handleChange}
          shape="rounded"
        />
      </Paper>
    </Grid>
  );
};

export default ArticlesPagination;
