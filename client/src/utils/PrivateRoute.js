import React, { useContext } from "react";
import PropTypes from "prop-types";
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

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};

export default PrivateRoute;
