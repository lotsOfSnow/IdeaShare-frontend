/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { FormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import Form from "../../components/article/form";
import { RootState } from "../../store";
import { useEditForm, withLoading } from "../../utilities";

const View: React.FC = () => {
  const { selected } = useSelector((state: RootState) => state.articles);
  const methods = useEditForm(selected);

  return (
    <FormContext {...methods}>
      <Form type="edit" articleId={selected.id as number} />
    </FormContext>
  );
};

export default withLoading(View, () => {
  const { selected } = useSelector((state: RootState) => state.articles);
  return selected.isLoaded;
});
