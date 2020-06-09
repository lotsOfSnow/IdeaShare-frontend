/* eslint-disable import/prefer-default-export */
import { makeStyles, Paper, PaperProps, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  paddedPaper: {
    padding: "10px",
  },
}));

export const PaddedPaper: React.FC<PaperProps> = ({ children }: PaperProps) => {
  const classes = useStyles();

  return <Paper className={classes.paddedPaper}>{children}</Paper>;
};
