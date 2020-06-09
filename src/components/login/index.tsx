/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { FormContext, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../features/auth/actions";
import { Credentials } from "../../features/auth/models";
import { RootState } from "../../store";
import View from "./form";

const Container = () => {
  const dispatch = useDispatch();
  const methods = useForm<Credentials>();
  const selectErrors = (state: RootState) => state.auth.errors;
  const errors = useSelector(selectErrors);

  useEffect(() => {
    if (errors !== null) {
      // methods.setError("password", "notMatch", errors);
      Object.keys(errors).forEach(key => {
        methods.setError(key as "email" | "password", "notMatch", errors[key]);
      });
    }
  }, [errors]);

  useEffect(() => {
    methods.clearError();
  }, []);

  const onSubmit = (data: Credentials) => {
    methods.clearError();
    dispatch(logIn(data));
  };

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <View />
      </form>
    </FormContext>
  );
};

export default Container;
