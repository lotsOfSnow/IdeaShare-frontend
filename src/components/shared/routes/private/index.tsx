/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { RootState } from "../../../../store/index";
import { withLoading } from "../../../../utilities";

// Used for routes that only authenticated users can access.
const PrivateRoute: React.FC<RouteProps> = props => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    const renderComponent = () => <Redirect to="/login" />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
  return <Route {...props} />;
};

export default withLoading(PrivateRoute, () => {
  const { isLoaded, loadingError } = useSelector(
    (state: RootState) => state.activeUser.user
  );
  return isLoaded || loadingError;
});
