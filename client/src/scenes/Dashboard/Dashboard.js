import React, { useContext, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Header from "./../../components/Header";
import Lists from "./../../components/Lists";
import CreateNewList from "../../components/CreateNewList";

import Tags from "../../components/Tags";

const Dashboard = () => {
  const [isCreateNewListOpen, setIsCreateNewListOpen] = useState(false);

  const toggleCreateNew = () => {
    setIsCreateNewListOpen(!isCreateNewListOpen);
  };

  return (
    <React.Fragment>
      <Header />
      <StyledContainer fixed>
        <Grid container justify="space-between">
          <Grid sm={12} md={4} lg={3}>
            <Tags />
          </Grid>

          <Grid container sm={12} md={8} lg={8}>
            <Grid container justify="space-between" alignItems="center">
              <Grid
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                sm={8}
              >
                <h3>Tasks</h3>
                <span>Add many task as you want</span>
              </Grid>

              <Grid
                sm={4}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Fab
                  color="primary"
                  aria-label="edit"
                  size="medium"
                  variant="extended"
                  onClick={toggleCreateNew}
                >
                  <AddIcon />
                  New Task
                </Fab>
              </Grid>
            </Grid>

            <VerticalSpacer />
            <Lists />
          </Grid>
        </Grid>
      </StyledContainer>

      <CreateNewList
        isOpen={isCreateNewListOpen}
        toggleOpen={toggleCreateNew}
      />
    </React.Fragment>
  );
};
export default Dashboard;

const StyledContainer = styled(Container)`
  padding-top: 60px;
`;

const VerticalSpacer = styled.div`
  height: 50px;
  display: block;
  width: 100%;
`;
