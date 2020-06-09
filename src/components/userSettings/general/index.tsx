/* eslint-disable react/jsx-wrap-multilines */
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { PaddedPaper } from "../../shared/paper";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  floatingButton: {
    right: theme.spacing(6),
    bottom: theme.spacing(2),
  },
}));

interface GeneralProps {
  register: any;
  setValue: any;
  formErrors: any;
  control: any;
}

const General: React.FC<GeneralProps> = ({
  register,
  setValue,
  formErrors,
  control,
}) => {
  const classes = useStyles();
  const selectUserData = (state: RootState) => state.activeUser.user;
  const userData = useSelector(selectUserData);

  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);

  const fileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file !== undefined) {
      setProfilePicture(URL.createObjectURL(file));
      setValue("profilePicture", file);
    }
  };

  useEffect(() => {
    register({ name: "profilePicture" });
  }, [register]);

  return (
    <Grid
      container
      spacing={6}
      direction="column"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid container item spacing={4}>
        <Grid item style={{ flexDirection: "column" }} xs={12} md={4}>
          <PaddedPaper>
            <Grid item container justify="flex-start" alignItems="flex-end">
              <Avatar
                alt={userData.userName as string}
                src={profilePicture as string}
                className={classes.avatar}
              />
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.floatingButton}
                  component="label"
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    type="file"
                    onChange={fileChange}
                    name="profilePicture"
                  />

                  <Edit />
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="First name"
                label="First name"
                inputRef={register}
                name="firstName"
                margin="normal"
                fullWidth
              />
              <Typography color="error">
                {formErrors.firstName && formErrors.firstName.message}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Last name"
                label="Last"
                inputRef={register}
                name="lastName"
                margin="normal"
                fullWidth
              />
              <Typography color="error">
                {formErrors.lastName && formErrors.lastName.message}
              </Typography>
            </Grid>
          </PaddedPaper>
        </Grid>
        <Grid item style={{ flexDirection: "column" }} xs>
          <PaddedPaper>
            <Grid item>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Email address"
                label="Email address"
                inputRef={register}
                name="email"
                margin="normal"
                fullWidth
              />
              <Typography color="error">
                {formErrors.email && formErrors.email.message}
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                as={
                  <FormControlLabel
                    control={<Checkbox inputRef={register} />}
                    label="Hide my real name"
                  />
                }
                control={control}
                name="isRealNameHidden"
              />
            </Grid>
            <Grid item>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                label="Bio"
                helperText="Max 300 characters"
                rows={4}
                inputProps={{
                  maxLength: 300,
                }}
                name="description"
                placeholder="Tell others about yourself."
                inputRef={register}
                margin="normal"
                fullWidth
              />
            </Grid>
          </PaddedPaper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default General;
