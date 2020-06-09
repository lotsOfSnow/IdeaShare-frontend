import { Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useQuery } from "../../customHooks/useQuery";
import {
  clearWithTag,
  fetchPreviewList,
  setPage,
  setWithTag,
} from "../../features/articles/actions";
import { RootState } from "../../store";
import ArticlesList from "./articlesList";
import Settings from "./displayOptions";
import Pagination from "./pagination";

const useStyles = makeStyles((theme: Theme) => ({
  searchBox: {
    marginBottom: "20px",
  },
}));

const Articles = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectConfig = (state: RootState) => state.articles.config;
  const page = useQuery().get("page");
  const tag = useQuery().get("tag");
  const history = useHistory();
  const { order, orderedBy, perPage } = useSelector(
    (state: RootState) => state.articles.config
  );

  useEffect(() => {
    if (tag) {
      dispatch(setWithTag(tag, history));
    } else {
      dispatch(clearWithTag(history));
    }

    if (page) {
      dispatch(setPage(parseInt(page, 0), history));
    }
    return () => {
      dispatch(setPage(1, history));
      dispatch(clearWithTag(history));
    };
  }, []);

  useEffect(() => {
    dispatch(fetchPreviewList());
  }, [tag, page, order, orderedBy, perPage]);

  return (
    <Grid container item direction="column" justify="center" spacing={5}>
      <Settings />
      <Grid item>
        <Pagination />
      </Grid>

      <ArticlesList />
      <Grid item>
        <Pagination />
      </Grid>
    </Grid>
  );
};

export default Articles;
