import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import BaseInput from "../shared/input/baseInput";

interface FormProps {
  buttonEnabled: boolean;
  success: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  successMessage: {
    background: theme.palette.success.main,
  },
}));

const Form: React.FC<FormProps> = ({ buttonEnabled, success }: FormProps) => {
  const { register, errors } = useFormContext();

  const classes = useStyles();

  return (
    <Grid
      container
      item
      justify="center"
      alignContent="center"
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h1" align="center">
          Register
        </Typography>
      </Grid>
      {success && (
        <Grid item>
          <Paper style={{ padding: "5px" }} className={classes.successMessage}>
            <Typography align="center">
              Your account was successfully created!
            </Typography>
            <Typography align="center">
              {`You may now `}
              <Link component={RouterLink} to="/login" color="secondary">
                log in
              </Link>
              .
            </Typography>
          </Paper>
        </Grid>
      )}
      <Grid item>
        <Paper style={{ padding: "5px" }}>
          <BaseInput
            id="email-input"
            label="Email address"
            type="email"
            name="email"
            inputRef={register}
          />
          <Typography color="error" align="center">
            {errors.email && errors.email.message}
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Paper style={{ padding: "5px" }}>
          <BaseInput
            id="username-input"
            label="Username"
            name="username"
            inputRef={register}
          />
          <Typography color="error" align="center">
            {errors.username && errors.username.message}
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Paper style={{ padding: "5px" }}>
          <BaseInput
            id="password-input"
            label="Password"
            type="password"
            name="password"
            inputRef={register}
          />
          <Typography color="error" align="center">
            {errors.password && errors.password.message}
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Button
          disabled={!buttonEnabled}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;
