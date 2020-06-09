import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserCard from "../../components/userProfile/card";
import UserStats from "../../components/userProfile/stats";
import { fetchUser } from "../../features/users/actions";
import { RootState } from "../../store";

interface RouteParams {
  username: string;
}

const Profile: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { username } = useParams<RouteParams>();
  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [username]);

  const render = () => {
    if (user.loadingError) {
      return (
        <Grid item>
          <Typography variant="h2" align="center" color="error">
            User not found
          </Typography>
        </Grid>
      );
    }

    return (
      <>
        <Grid item>
          <UserCard />
        </Grid>
        <Grid item>
          <UserStats />
        </Grid>
      </>
    );
  };

  return (
    <Grid container item direction="column" justify="center" spacing={2}>
      {render()}
    </Grid>
  );
};

export default Profile;
