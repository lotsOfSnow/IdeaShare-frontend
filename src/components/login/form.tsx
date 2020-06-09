import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";

const LoginForm: React.FC = () => {
  const { register, errors } = useFormContext();
  return (
    <Grid
      container
      item
      direction="column"
      spacing={2}
      xs={4}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Grid item>
        <Typography variant="h1" align="center">
          Sign in
        </Typography>
      </Grid>
      <Grid item>
        <Paper style={{ padding: "5px" }}>
          <TextField
            id="email-input"
            label="Email address"
            type="email"
            name="email"
            inputRef={register}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper style={{ padding: "5px" }}>
          <TextField
            id="password-input"
            label="Password"
            type="password"
            fullWidth
            name="password"
            inputRef={register}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>
        <Typography color="error" align="center">
          {errors.password && errors.password.message}
        </Typography>
      </Grid>
      <Grid item>
        <Button fullWidth variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
