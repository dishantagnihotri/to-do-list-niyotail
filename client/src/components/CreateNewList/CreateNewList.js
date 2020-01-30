import React, { useState } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

import useApi from "../../hooks/useApi";

const CreateNewList = ({ isOpen, toggleOpen }) => {
  const [title, setTitle] = useState("");
  const [initialColor, setInitialColor] = useState("#000");
  const [colors, setColors] = useState(["#000", "#888", "#ff0", "#f00"]);

  const api = useApi();

  // - Add Loader

  const createNewList = async () => {
    try {
      const response = await api.post(`lists`, {
        title,
        color: initialColor,
        user_id: 1
      });

      console.log(response);

      if (response.status === 200) {
        // - Push value inside List Context
        toggleOpen();
      }
    } catch (error) {
      console.log({ error });
    } finally {
      toggleOpen();
    }
  };

  const setNewColor = color => {
    console.log({ color });
    if (color !== initialColor) setInitialColor(color);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggleOpen}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New To-do List</DialogTitle>

      <DialogContent>
        <DialogContentText>
          You need to create new list everytime you want to save to-do on a new
          list.
        </DialogContentText>

        <TextField
          autoFocus
          id="name"
          label="What should be the name of to do"
          type="text"
          fullWidth
          onChange={callback => {
            setTitle(callback.target.value);
          }}
        />
        <Colors>
          {(() => {
            return colors.map(color => {
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
        </Colors>
      </DialogContent>

      <DialogActions>
        <Button onClick={createNewList} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewList;

const Colors = styled.div`
    width: 100%    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const Color = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${props => (props.color ? props.color : "#000")};
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;

  ${props => {
    if (props.active) {
      return "border: 1px solid blue";
    }
  }}
`;
