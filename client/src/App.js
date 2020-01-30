import React, { useEffect, useState } from "react";
// import { ThemeProvider } from "styled-components";
import { Switch, withRouter } from "react-router-dom";

import Auth from "./components/Auth";
import Route from "./components/Route";

import ModeContext from "./contexts/ModeContext";

import Dashboard from "./scenes/Dashboard";
import Login from "./scenes/Login";
import Register from "./scenes/Register";

const App = () => {
  const [mode, setMode] = useState("light");

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode
      }}
    >
      <Auth>
        <React.Fragment>
          <React.Suspense fallback={<p>Loading</p>}>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route
                path="*"
                component={() => {
                  return 404;
                }}
              />
            </Switch>
          </React.Suspense>
        </React.Fragment>
      </Auth>
      ;
    </ModeContext.Provider>
  );
};

export default withRouter(App);
