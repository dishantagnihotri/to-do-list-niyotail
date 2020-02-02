import React, { useContext, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";

import Header from "./../../components/Header";
import Lists from "./../../components/Lists";
import AuthContext from "../../contexts/AuthContext";

const Dashboard = () => {
  const { auth, redirectIfNotAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    redirectIfNotAuthenticated();
  }, [auth]);

  if (!auth.auth) {
    return (
      <Alert severity="info">
        You are not loggedIn. Redirecting to the login page.
      </Alert>
    );
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
