/* eslint-disable react/jsx-props-no-spreading */
import _ from "lodash";
import React, { useEffect } from "react";
import { FormContext, useForm } from "react-hook-form";
import useRequest from "../../customHooks/useRequest";
import * as webapi from "../../webapi";
import BackdropLoader from "../shared/loaders/backdropLoader";
import Form from "./form";

const Container = () => {
  const endpoint = webapi.register();

  const methods = useForm();
  const { makeRequest, success, loaded, loading, result } = useRequest(
    endpoint.method,
    endpoint.route,
    false,
    false
  );

  useEffect(() => {
    if (loaded && !success) {
      result.errors.forEach((item: any) => {
        methods.setError(_.camelCase(item.field), "notMatch", item.message);
      });
    }
  }, [loaded, success]);

  useEffect(() => {
    methods.clearError();
  }, []);

  const onSubmit = (data: any) => {
    methods.clearError();
    makeRequest(JSON.stringify(data));
  };

  return (
    <FormContext {...methods}>
      <BackdropLoader open={loading} text="Creating your account..." />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Form buttonEnabled={!loading} success={success} />
      </form>
    </FormContext>
  );
};

export default Container;
