import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../constants/routes.json";
import { PrivateRoute, RestrictedRoute } from "./shared/routes";
import Home from "../pages/Home";
import Articles from "../pages/articles";
import Article from "../pages/article";
import Profile from "../pages/profile";
import NewArticle from "../pages/newArticle";
import EditArticle from "../pages/editArticle";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import AccountSettings from "../pages/accountSettings";
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/NotFound";

const AppRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path={routes.home.route} component={Articles} />
      <Route exact path={routes.articles.route} component={Articles} />
      <RestrictedRoute exact path={routes.signIn.route} component={SignIn} />
      <RestrictedRoute exact path={routes.signUp.route} component={SignUp} />
      <PrivateRoute
        exact
        path={[
          routes.accountSettings.default.route,
          routes.accountSettings.general.route,
          routes.accountSettings.security.route,
        ]}
        component={AccountSettings}
      />
      <Route
        exact
        path="(/dashboard|/dashboard/articles|/dashboard/comments)"
        component={Dashboard}
      />
      <PrivateRoute
        exact
        path={routes.newArticle.route}
        component={NewArticle}
      />
      <Route exact path={routes.article.route} component={Article} />
      <Route exact path={routes.userProfile.route} component={Profile} />
      <PrivateRoute
        exact
        path={routes.editArticle.route}
        component={EditArticle}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRouter;
