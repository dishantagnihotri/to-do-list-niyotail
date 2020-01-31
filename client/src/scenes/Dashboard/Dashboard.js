import React, { useContext, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Header from "./../../components/Header";
import Lists from "./../../components/Lists";

import useApi from "./../../hooks/useApi";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header />
      <StyledContainer fixed>
        <Grid container>
          <Grid sm={12} md={4} lg={3}>
            <h3>Tags</h3>
          </Grid>

          <Grid sm={12} md={8} lg={9}>
            <Lists />
          </Grid>
        </Grid>
      </StyledContainer>
    </React.Fragment>
  );
};
export default Dashboard;

const StyledContainer = styled(Container)`
  padding-top: 60px;
`;
