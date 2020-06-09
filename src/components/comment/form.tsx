import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  Zoom,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "../../customHooks/useAlert";
import useRequest from "../../customHooks/useRequest";
import { fetchArticleComments } from "../../features/comments/actions";
import { RootState } from "../../store";
import * as webapi from "../../webapi";
import { PaddedPaper } from "../shared/paper";
import MySnackbar from "../shared/snackbar";

interface FormProps {
  articleId: number;
}

const Form: React.FC<FormProps> = ({ articleId }) => {
  const methods = useForm({ mode: "onSubmit" });
  const alertMethods = useAlert("s", "error");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const selectUser = (state: RootState) => state.activeUser;
  const { userName, profilePicture } = useSelector(selectUser).user;

  const endpoint = webapi.createArticleComment(articleId);

  const { loading, makeRequest, success, loaded } = useRequest(
    endpoint.method,
    endpoint.route,
    true,
    false
  );

  const onSubmit = (data: any) => {
    makeRequest(JSON.stringify(data));
  };

  const handleCancel = () => {
    methods.setValue("body", "");
    methods.clearError();
    setOpen(false);
  };

  useEffect(() => {
    if (loaded) {
      if (success) {
        alertMethods.setText("Your comment was successfully submitted!");
        alertMethods.setSeverity("success");
        dispatch(fetchArticleComments(articleId));
        handleCancel();
      } else {
        alertMethods.setText("Sorry, something went wrong on our end.");
        alertMethods.setSeverity("error");
      }
      alertMethods.setIsOpen(true);
    }
  }, [loaded, success]);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <MySnackbar
        isOpen={alertMethods.isOpen}
        severity={alertMethods.severity}
        text={alertMethods.text}
        onClose={() => alertMethods.setIsOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />

      <PaddedPaper>
        <Grid container item direction="column" spacing={1}>
          {open && (
            <Zoom in={open}>
              <Grid container item alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar src={profilePicture as string}>W</Avatar>
                </Grid>
                <Grid item>
                  <Typography color="primary" variant="h6">
                    {userName}
                  </Typography>
                </Grid>
              </Grid>
            </Zoom>
          )}

          <Grid item>
            <TextField
              inputRef={methods.register({ required: true })}
              name="body"
              fullWidth
              multiline
              rows={open ? 3 : 1}
              onClick={() => setOpen(true)}
              variant="outlined"
              placeholder="Write a comment..."
            />
            {methods.errors.body && (
              <Typography color="error">Your input is required.</Typography>
            )}
          </Grid>
          {open && (
            <Grid container item spacing={2}>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Send
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  style={{ marginLeft: "10px" }}
                  onClick={handleCancel}
                >
                  Discard
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </PaddedPaper>
    </form>
  );
};

export default Form;
