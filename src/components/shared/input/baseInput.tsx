import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

type BaseInputProps = TextFieldProps & {
  name?: string;
};

const BaseInput: React.FC<BaseInputProps> = ({
  name,
  inputRef,
  id,
  label,
  type,
  multiline,
  rows,
  inputProps,
  placeholder,
  variant,
  onClick,
  onBlur,
}: BaseInputProps) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      name={name}
      inputRef={inputRef}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{ inputProps }}
      variant={variant}
      onClick={onClick}
      onBlur={onBlur}
    />
  );
};

export default BaseInput;
