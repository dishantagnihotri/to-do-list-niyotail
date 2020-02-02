import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

import Auth from "./components/Auth";
import Dashboard from "./scenes/Dashboard";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#1a73e8"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        Maintenance
        closeOnClick
      />
      <Auth>
        <React.Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />

            <Route
              path="*"
              component={() => {
                return (
                  <p>
                    Page Not Found! <a href="/login">Click here.</a>
                  </p>
                );
              }}
            />
          </Switch>
        </React.Suspense>
      </Auth>
    </ThemeProvider>
  );
};

export default withRouter(App);
