import { Grid, Typography } from "@material-ui/core";
import React from "react";

const NotFound = () => {
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item>
        <Typography variant="h1" style={{ color: "red" }}>
          Page not found!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
