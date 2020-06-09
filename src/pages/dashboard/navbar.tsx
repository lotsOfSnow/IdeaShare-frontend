import { Paper } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Navbar = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="Articles" component={Link} to="/dashboard/articles" />
          <Tab label="Comments" component={Link} to="/dashboard/comments" />
        </Tabs>
      </Paper>
    </div>
  );
};

export default Navbar;
