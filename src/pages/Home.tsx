import { Button, Fade } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../features/auth/actions";
import { LOGOUT_SUCCESS } from "../features/auth/constants";

const Home = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(logIn({ email: "x@x.x", password: "1" }));
  };

  const handleLogoutClick = () => {
    dispatch({ type: LOGOUT_SUCCESS });
  };

  return (
    <div>
      Home
      <div>
        <Fade in timeout={2000}>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLoginClick}
            >
              LOG-IN
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogoutClick}
            >
              LOG-OUT
            </Button>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Home;
