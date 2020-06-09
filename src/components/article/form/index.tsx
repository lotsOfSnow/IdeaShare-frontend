/* eslint-disable react/jsx-props-no-spreading */
import { Fab, Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Controller, FormContext, useFormContext } from "react-hook-form";
import { Redirect } from "react-router";
import routes from "../../../constants/routes.json";
import useAlert from "../../../customHooks/useAlert";
import useRequest from "../../../customHooks/useRequest";
import { Article } from "../../../features/articles/models";
import * as webapi from "../../../webapi";
import { PaddedPaper } from "../../shared/paper";
import MySnackbar from "../../shared/snackbar";
import Fields from "./fields";

interface FormProps {
  type: "create" | "edit";
  articleId?: number;
}

interface FormData {
  id?: number;
  title: string;
  body: string;
  description: string;
  tags: string[];
}

const Form: React.FC<FormProps> = ({ type, articleId }: FormProps) => {
  const methods = useFormContext<FormData>();
  const [tags, setTags] = useState<string[]>(methods.getValues("tags"));

  const endpoint =
    type === "create"
      ? webapi.createArticle()
      : webapi.updateArticle(articleId as number);

  const {
    makeRequest,
    loading,
    loaded,
    error,
    errorText,
    success,
    result,
  } = useRequest(endpoint.method, endpoint.route, true, true);
  const formRef = useRef(null);

  const {
    isOpen: isSnackbarOpen,
    setIsOpen: setIsSnackbarOpen,
    text: snackbarText,
    setText: setSnackbarText,
    severity: snackbarSeverity,
    setSeverity: setSnackbarSeverity,
  } = useAlert("", "success");

  const [redirectToArticle, setRedirectToArticle] = useState(false);

  const handleRedirect = () => {
    setTimeout(() => setRedirectToArticle(true), 2000);
  };

  useEffect(() => {
    if (type !== "edit") {
      return;
    }
    methods.setValue("id", articleId);
  }, []);

  const onSubmit = (data: FormData) => {
    methods.clearError();
    methods.setValue("id", articleId as number);
    const fd = new FormData((formRef.current as unknown) as HTMLFormElement);
    if (tags.length > 0) {
      fd.set("tags", tags.toString());
    }
    // new Response(fd).text().then(console.log);

    makeRequest(fd);
  };

  useEffect(() => {
    if (error) {
      // console.log(error);
      // console.log(errorText);
      setSnackbarText("Oops! Something went wrong.");
      setSnackbarSeverity("error");
      setIsSnackbarOpen(true);
      // eslint false positive due to nullable errorText
      // eslint-disable-next-line no-unused-expressions
      errorText?.errors.map(item =>
        methods.setError(item.field, "notMatch", item.message)
      );
    } else if (loaded && success) {
      methods.clearError();
      setSnackbarText(
        "Your article was successfully saved! You will be redirected to it shortly."
      );
      setSnackbarSeverity("success");
      setIsSnackbarOpen(true);
      handleRedirect();
    }
  }, [loaded, success, error]);

  if (redirectToArticle) {
    const resourceId = type === "create" ? (result as Article).id : articleId;

    return <Redirect to={`${routes.articles.route}/${resourceId}`} />;
  }

  return (
    <FormContext {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        ref={formRef}
        encType="multipart/form-data"
      >
        <Controller
          name="id"
          control={methods.control}
          defaultValue={articleId}
          as={<input hidden />}
        />
        <Grid container justify="flex-end" style={{ marginBottom: "10px" }}>
          <Fab
            type="submit"
            color="primary"
            variant="extended"
            disabled={loading || (loaded && success)}
          >
            Submit
          </Fab>
        </Grid>
        <PaddedPaper>
          <Fields tags={tags} setTags={setTags} />
        </PaddedPaper>
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
    </FormContext>
  );
};

export default Form;
