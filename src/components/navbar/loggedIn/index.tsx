import { Button, Container, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../constants/routes.json";
import useStyles from "../sharedStyles";
import Dropdown from "./dropdown";

interface LoggedInProps {
  value: number;
  handleChange: (e: React.ChangeEvent<{}>, newValue: number) => void;
}

const LoggedIn: React.FC<LoggedInProps> = ({
  value,
  handleChange,
}: LoggedInProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThisChange = (
    e: React.ChangeEvent<{}> | React.MouseEvent<HTMLButtonElement>,
    newValue: number
  ) => {
    if (newValue === 3) {
      handleClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <>
      <Container fixed className={classes.container}>
        <Tabs
          value={value}
          onChange={(e, newValue) => {
            handleChange(e, newValue);
            handleThisChange(e, newValue);
          }}
          classes={{ indicator: classes.bigIndicator }}
        >
          <Tab className={classes.hidden} />
          <Tab className={classes.hidden} />

          <Tab
            className={classes.tab}
            label={routes.newArticle.display}
            component={Link}
            to={routes.newArticle.route}
          />
          <Tab
            className={classes.tab}
            label={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <div>Account</div>
            }
          />
        </Tabs>
        <Dropdown anchorEl={anchorEl} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default LoggedIn;
