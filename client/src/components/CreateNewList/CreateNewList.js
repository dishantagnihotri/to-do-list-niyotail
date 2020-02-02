import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";

import useApi from "../../hooks/useApi";
import ListsContext from "../../contexts/ListsContext";

const INITIAL_COLORS = ["#f44336", "#e91e63", "#9c27b0", "#1e88e5", "#009688"];

const CreateNewList = ({ isOpen, toggleOpen }) => {
  const [title, setTitle] = useState("");
  const [initialColor, setInitialColor] = useState("#f44336");
  const { addNewLists } = useContext(ListsContext);

  const api = useApi();

  const createNewList = () => {
    const list = {
      title,
      color: initialColor,
      user_id: 1
    };
    addNewLists(list);
  };

  const setNewColor = color => {
    if (color !== initialColor) setInitialColor(color);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggleOpen}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Task</DialogTitle>

      <Divider />

      <DialogContent>
        <VerticalSpacer />

        <Grid container direction="column">
          <TextField
            autoFocus
            id="name"
            label="Give task a name"
            placeholder="Eg - Work, Personal, Reading etc."
            type="text"
            fullWidth
            onChange={callback => {
              setTitle(callback.target.value);
            }}
            style={{
              width: 450
            }}
          />

          <VerticalSpacer />

          <Grid container justify="flex-start" alignItems="center">
            <Typography variant="h6">Assign a color - </Typography>

            {(() => {
              return INITIAL_COLORS.map(color => {
                return (
                  <Color
                    key={color}
                    color={color}
                    active={color === initialColor ? true : false}
                    onClick={() => setNewColor(color)}
                  />
                );
              });
            })()}
          </Grid>

          <VerticalSpacer />
        </Grid>

        <VerticalSpacer />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={createNewList}
          color="primary"
          disabled={title.length === 0}
        >
          Create this task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewList;

const Color = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${props => (props.color ? props.color : "#FFF")};
  border-radius: 50%;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;

  ${props => {
    if (props.active) {
      return "border: 3px solid #aaa; transform: scale(1.2) !important;";
    }
  }}
`;

const VerticalSpacer = styled.div`
  height: 20px;
  width: 100%;
`;
