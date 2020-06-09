/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const withLoading = <T,>(Component: React.FC<T>, condition: () => boolean) => (
  props: T
) => {
  const render = () => {
    if (condition() === false) {
      return (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Skeleton
            variant="rect"
            animation="wave"
            height="30vh"
            width="80%"
            style={{ marginBottom: 6 }}
          />
        </Grid>
      );
    }

    return <Component {...props} />;
  };

  return render();
};

export default withLoading;
