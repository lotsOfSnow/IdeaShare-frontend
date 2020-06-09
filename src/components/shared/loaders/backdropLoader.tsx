import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: 2000,
    color: "#fff",
  },
}));

interface BackdropLoaderProps {
  open: boolean;
  text?: string;
}

const BackdropLoader: React.FC<BackdropLoaderProps> = ({
  open,
  text,
}: BackdropLoaderProps) => {
  const classes = useStyles();

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <div>
        <CircularProgress
          color="inherit"
          style={{ marginLeft: "50%", marginRight: "50%" }}
        />

        <Typography align="center">{text || "Please wait..."}</Typography>
      </div>
    </Backdrop>
  );
};

export default BackdropLoader;
