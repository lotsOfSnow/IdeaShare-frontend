import { Grid, Link, Paper } from "@material-ui/core";
import React from "react";

const Footer: React.FC<{}> = () => {
  return (
    <Paper
      style={{
        position: "relative",
        clear: "both",
        padding: "5px",
        marginTop: "calc(2%)",
      }}
    >
      <Link
        href="https://www.freepik.com/free-photos-vectors/background"
        align="center"
      >
        Background vector created by freepik - www.freepik.com
      </Link>
    </Paper>
  );
};

export default Footer;
