import { Box, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { withLoading } from "../../../utilities";
import { CustomAvatar } from "../../shared/avatar";
import { PaddedPaper } from "../../shared/paper";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflowWrap: "anywhere",
    wordBreak: "break-all",
  },
}));

const UserCard: React.FC = () => {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user);

  return (
    <PaddedPaper className={classes.root}>
      <Grid container item spacing={1} wrap="nowrap">
        <Grid item>
          <Grid container item direction="column">
            <Grid item>
              <Box borderRadius="50%" border={5} borderColor="secondary.main">
                <CustomAvatar
                  size="huge"
                  alt={user.userName as string}
                  src={user.profilePicture as string}
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography align="center" color="textSecondary">
                Joined
              </Typography>
              <Typography align="center" color="textSecondary">
                {moment.utc(user.registrationDate).format("DD MMMM, YYYY")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container item direction="column">
            {!user.isRealNameHidden && user.firstName && user.lastName && (
              <Grid item>
                <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
              </Grid>
            )}
            <Grid item>
              <Typography variant="h4">{user.userName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                {user.description ||
                  "This user did not write anything about themselves."}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ marginLeft: "auto", marginTop: "auto" }} />
      </Grid>
    </PaddedPaper>
  );
};

export default withLoading(UserCard, () => {
  const { isLoaded } = useSelector((state: RootState) => state.user);
  return isLoaded;
});
