import { Button, Container } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../constants/routes.json";
import useStyles from "../sharedStyles";

const NotLoggedIn: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Button component={Link} to={routes.signIn.route} variant="contained">
        Login
      </Button>
      <Button
        component={Link}
        to={routes.signUp.route}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Register
      </Button>
    </Container>
  );
};

export default NotLoggedIn;
