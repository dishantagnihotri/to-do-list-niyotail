import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

import Container from "@material-ui/core/Container";

import Header from "./../../components/Header";
import Lists from "./../../components/Lists";
import AuthContext from "../../contexts/AuthContext";

const Dashboard = () => {
  const { auth, redirectIfNotAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    checkLogin();
  }, [auth]);

  const checkLogin = () => {
    console.log("dashboard state", auth);
    if (!auth || !auth.accessToken) redirectIfNotAuthenticated();
  };

  if (!auth) {
    return '<a href="/login">Login</a>';
  }

  return (
    <React.Fragment>
      <Header />

      <StyledContainer fixed>
        <Grid container>
          <Lists />
        </Grid>
      </StyledContainer>
    </React.Fragment>
  );
};
export default Dashboard;

const StyledContainer = styled(Container)`
  padding-top: 60px;
`;
