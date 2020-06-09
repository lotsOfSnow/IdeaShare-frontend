import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useEditForm = (data: {}) => {
  const form = useForm({ defaultValues: data || undefined });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return form;
};

export default useEditForm;
