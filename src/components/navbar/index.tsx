import { AppBar, Tab, Tabs, Theme, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import routes from "../../constants/routes.json";
import { clearWithTag } from "../../features/articles/actions";
import { RootState } from "../../store";
import ElevationScroll from "../shared/elevationScroll";
import LoggedIn from "./loggedIn";
import NotLoggedIn from "./notLoggedIn";
import useSharedStyles from "./sharedStyles";

const useStyles = makeStyles((theme: Theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "1em",
  },
  logo: {
    height: "2em",
  },
  articleTitle: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Navbar: React.FunctionComponent<RouteComponentProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selectIsLoggedIn = (state: RootState) => state.auth.isAuthenticated;
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  const history = useHistory();
  const [value, setValue] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === 1) {
      dispatch(clearWithTag(history));
    }
    setValue(newValue);
  };

  const setCorrectValue = () => {
    if (
      (location.pathname === routes.home.route && value !== 0) ||
      (location.pathname.includes(routes.articles.route) && value !== 1)
    ) {
      setValue(0);
    } else if (location.pathname === routes.newArticle.route && value !== 2) {
      setValue(2);
    } else if (
      location.pathname === routes.accountSettings.general.route ||
      location.pathname === routes.userProfile.route ||
      (location.pathname === routes.userDashboard.base.route && value !== 3)
    ) {
      setValue(3);
    }
  };

  useEffect(() => {
    setCorrectValue();
  }, [value, location.pathname]);

  const renderCorrectMenu = () => {
    if (!isLoggedIn) {
      return <NotLoggedIn />;
    }

    return <LoggedIn value={value} handleChange={handleChange} />;
  };

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense" disableGutters>
            <Tabs
              classes={{ indicator: sharedClasses.bigIndicator }}
              value={value}
              onChange={handleChange}
              variant="fullWidth"
            >
              <Tab
                className={sharedClasses.tab}
                component={Link}
                to={routes.articles.route}
                label="Articles"
              />
              <Tab disabled className={sharedClasses.hidden} />
              <Tab disabled className={sharedClasses.hidden} />
            </Tabs>

            {renderCorrectMenu()}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default withRouter(Navbar);
