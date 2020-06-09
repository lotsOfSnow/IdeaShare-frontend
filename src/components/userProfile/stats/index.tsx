import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { withLoading } from "../../../utilities";
import { PaddedPaper } from "../../shared/paper";

const Stats: React.FC = () => {
  const { articlesWritten, likesReceived } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <PaddedPaper>
      <Grid container item spacing={3} justify="center">
        <Grid item>
          <Typography align="center" variant="h5">
            {articlesWritten}
          </Typography>
          <Typography>
            {`Article${articlesWritten === 1 ? "" : "s"} written`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="h5">
            {likesReceived}
          </Typography>
          <Typography>
            {`Like${likesReceived === 1 ? "" : "s"} received`}
          </Typography>
        </Grid>
      </Grid>
    </PaddedPaper>
  );
};

export default withLoading(Stats, () => {
  const { isLoaded } = useSelector((state: RootState) => state.user);
  return isLoaded;
});
