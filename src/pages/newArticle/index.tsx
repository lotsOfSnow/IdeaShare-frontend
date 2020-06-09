/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { FormContext, useForm } from "react-hook-form";
import Form from "../../components/article/form";

const NewArticle: React.FC = () => {
  const methods = useForm();

  return (
    <FormContext {...methods}>
      <Form type="create" />
    </FormContext>
  );
};

export default NewArticle;
