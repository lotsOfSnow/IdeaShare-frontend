/* eslint-disable jsx-a11y/no-static-element-interactions */
import { IconButton, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface StyleButtonProps {
  handleToggle: any;
  style: any;
  active: boolean;
  label: any;
  icon: JSX.Element;
  type: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  /*  buttonActive: {
    color: "white",
  },
  button: {
    color: "black",
  }, */
}));

const StyleButton: React.FC<StyleButtonProps> = ({
  handleToggle,
  style,
  active,
  label,
  icon,
  type,
}: StyleButtonProps) => {
  const classes = useStyles();

  const onToggle = (e: any) => {
    e.preventDefault();
    handleToggle(style, type);
  };

  return (
    <IconButton onMouseDown={onToggle} color={active ? "primary" : "default"}>
      {icon}
    </IconButton>
  );
};

export default StyleButton;
