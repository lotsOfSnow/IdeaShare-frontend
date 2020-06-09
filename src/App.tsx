import { CssBaseline, Grid, makeStyles, Divider } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ActionButtons from "./components/actionButtons";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/navbar";
import ScrollToTopButton from "./components/scrollToTopButton";
import BackdropLoader from "./components/shared/loaders/backdropLoader";
import { loadUser } from "./features/activeUser/actions";
import { RootState } from "./store";
import Footer from "./components/footer";
import theme from "./styles/Theme";

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 2000,
    color: "#fff",
  },
}));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isLoading } = useSelector(
    (state: RootState) => state.activeUser.user
  );

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const render = () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BackdropLoader open={isLoading} />
        <Router>
          <Navbar />
          <Grid container justify="space-between" alignItems="flex-start">
            <Grid item container justify="center" xs>
              <ActionButtons />
            </Grid>
            <Grid item container justify="center" direction="column" xs={7}>
              <AppRouter />
              <Footer />
            </Grid>
            <Grid item container xs justify="center">
              <ScrollToTopButton />
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    );
  };

  return render();
};

export default App;
