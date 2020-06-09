import { Fab, Grid, Paper } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MySnackbar from "../../components/shared/snackbar";
import UserSettings from "../../components/userSettings/index";
import Navbar from "../../components/userSettings/navbar";
import useAlert from "../../customHooks/useAlert";
import useRequest from "../../customHooks/useRequest";
import { RootState } from "../../store";
import { useEditForm, withLoading } from "../../utilities";
import * as webapi from "../../webapi";

const AccountSettings = () => {
  const selectUserData = (state: RootState) => state.activeUser.user;
  const userData = useSelector(selectUserData);
  const {
    isOpen: isSnackbarOpen,
    setIsOpen: setIsSnackbarOpen,
    text: snackbarText,
    setText: setSnackbarText,
    severity: snackbarSeverity,
    setSeverity: setSnackbarSeverity,
  } = useAlert("", "success");
  const [buttonText, setButtonText] = useState("SAVE CHANGES");

  const endpoint = webapi.updateUser(userData.userName as string);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    errors,
    clearError,
    getValues,
    control,
    watch,
  } = useEditForm(userData);
  const { result, status, success, loaded, loading, makeRequest } = useRequest(
    endpoint.method,
    endpoint.route,
    true,
    true
  );
  const watchAllFields = watch();
  const formRef = useRef(null);

  const onSubmit = (data: {}) => {
    const fd = new FormData((formRef.current as unknown) as HTMLFormElement);
    fd.set("isRealNameHidden", getValues("isRealNameHidden"));
    makeRequest(fd);
    clearError();
  };

  useEffect(() => {
    if (loading) {
      setIsSnackbarOpen(false);
    }

    if (loaded && success) {
      setIsSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarText("Changes successfully applied!");
    }

    if (loaded && !success) {
      setIsSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarText("Oops! Something went wrong.");

      result.errors.forEach((item: any) => {
        setError(_.camelCase(item.field), "notMatch", item.message);
      });
    }
  }, [loading, loaded, status]);

  return (
    <Grid item>
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        encType="multipart/form-data"
      >
        <Grid container item justify="flex-end">
          <Grid item>
            <Fab
              color="primary"
              variant="extended"
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                marginBottom: "20px",
              }}
              disabled={loading}
              type="submit"
            >
              {buttonText}
            </Fab>
          </Grid>
        </Grid>

        <Paper>
          <Navbar />
        </Paper>
        <UserSettings
          formErrors={errors}
          setValue={setValue}
          register={register}
          control={control}
        />
      </form>
      <MySnackbar
        isOpen={isSnackbarOpen}
        severity={snackbarSeverity}
        text={snackbarText}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
    </Grid>
  );
};

export default withLoading(AccountSettings, () => {
  const selectUserData = (state: RootState) => state.activeUser.user;
  const userData = useSelector(selectUserData);

  return userData.isLoaded;
});
