import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { PaddedPaper } from "../../shared/paper";

interface SecurityProps {
  register: any;
  formErrors: any;
}

const Security: React.FC<SecurityProps> = ({
  register,
  formErrors,
}: SecurityProps) => {
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
        <Grid item style={{ flexDirection: "column" }} xs>
          <PaddedPaper>
            <Grid item>
              <input style={{ display: "none" }} name="email" ref={register} />
              <input
                style={{ display: "none" }}
                name="firstName"
                ref={register}
              />
              <input
                style={{ display: "none" }}
                name="lastName"
                ref={register}
              />
              <input
                style={{ display: "none" }}
                name="isRealNameHidden"
                ref={register}
              />
              <input
                style={{ display: "none" }}
                name="description"
                ref={register}
              />

              <TextField
                label="Current password"
                fullWidth
                margin="normal"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                name="currentPassword"
                inputRef={register}
              />
              <Typography color="error">
                {formErrors.currentPassword &&
                  formErrors.currentPassword.message}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-full-width"
                label="New password"
                fullWidth
                type="password"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                name="newPassword"
                inputRef={register}
              />
              <Typography color="error">
                {formErrors.newPassword && formErrors.newPassword.message}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-full-width"
                label="Retype new password"
                fullWidth
                type="password"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                name="newPasswordConfirmation"
                inputRef={register}
              />
              <Typography color="error">
                {formErrors.newPasswordConfirmation &&
                  formErrors.newPasswordConfirmation.message}
              </Typography>
            </Grid>
          </PaddedPaper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Security;
