import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setArticlesPerPage } from "../../../features/articles/actions";
import OrderByKeySelector from "./orderByKeySelector";
import OrderBySelector from "./orderBySelector";
import PerPageSelector from "./perPageSelector";
import SearchForm from "./searchForm";

const Settings: React.FC = () => {
  return (
    <Grid container item alignContent="flex-end" alignItems="flex-end">
      <PerPageSelector />
      <OrderByKeySelector />
      <OrderBySelector />
      <SearchForm />
    </Grid>
  );
};

export default Settings;
