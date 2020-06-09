import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { RootState } from "../../store";
import { withLoading } from "../../utilities";
import Articles from "./articles";
import Comments from "./comments";
import Navbar from "./navbar";

const Dashboard = () => {
  return (
    <>
      <Grid container item spacing={1}>
        <Grid item>
          <Navbar />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Switch>
            <Route
              exact
              path="(/dashboard|/dashboard/articles)"
              component={Articles}
            />
            <Route exact path="/dashboard/comments" component={Comments} />
          </Switch>
        </Grid>
      </Grid>
    </>
  );
};

export default withLoading(Dashboard, () => {
  const { isLoaded } = useSelector((state: RootState) => state.activeUser.user);
  return isLoaded;
});
