import { Chip } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setWithTag } from "../../../features/articles/actions";

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }: TagProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = () => {
    dispatch(setWithTag(label, history));
  };

  return <Chip label={label} clickable onClick={onClick} />;
};

export default Tag;
