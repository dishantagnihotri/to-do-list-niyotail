import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return (
      <Route {...rest} render={props => <Redirect to="/login" {...props} />} />
    );
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PrivateRoute;
