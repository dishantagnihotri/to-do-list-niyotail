import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Fab,
  Button,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import { Alert, AlertTitle } from "@material-ui/lab";

import ListsContext from "../../contexts/ListsContext";
import Tags from "../../components/Tags";

export const ListCustomAction = ({ todo }) => {
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const { deleteTodos, updateTodos } = useContext(ListsContext);

  const deleteTodo = async value => await deleteTodos(value);

  const updateTodo = (event, value) => {
    event.preventDefault();

    updateTodos({
      ...value,
      title
    });

    setIsEditingTodo(false);
  };

  return (
    <React.Fragment>
      <Content>
        {(() => {
          if (isEditingTodo) {
            return (
              <form
                noValidate
                autoComplete="off"
                onSubmit={event => updateTodo(event, todo)}
                onBlur={event => updateTodo(event, todo)}
                disabled={isLoading}
              >
                <TextField
                  id="standard-basic"
                  label="Standard"
                  disabled={isLoading}
                  onChange={event => setTitle(event.target.value)}
                  value={title}
                />
              </form>
            );
          }

          return <Typography variany="h6">{title}</Typography>;
        })()}

        <TagsHolder>
          <Tags todos_id={todo.id} isEditingTodo={isEditingTodo} />
        </TagsHolder>
      </Content>

      <StyledListItemSecondaryAction>
        <IconButton edge="end" onClick={event => setIsEditingTodo(true)}>
          <EditIcon />
        </IconButton>

        <IconButton edge="end" onClick={() => deleteTodo(todo)}>
          <DeleteOutlineIcon />
        </IconButton>
      </StyledListItemSecondaryAction>
    </React.Fragment>
  );
};

const ToDo = ({ todos, lists_id }) => {
  const [isAddingNewToDo, setIsAddingNewToDo] = useState(false);
  const [isLoadingNewToDo, setIsLoadingNewToDo] = useState(false);
  const [newToDo, setNewToDo] = useState(null);

  const { updateTodos, addNewTodos } = useContext(ListsContext);

  const handleToggle = value => () => {
    value.isDone = !value.isDone;
    updateTodos(value);
  };

  const addNewTodo = async event => {
    event.preventDefault();
    setIsLoadingNewToDo(true);

    if (newToDo && newToDo.length)
      addNewTodos({
        title: newToDo,
        lists_id,
        description: "something",
        isDone: 0
      });

    setNewToDo(null);
    setIsLoadingNewToDo(false);
    setIsAddingNewToDo(false);
  };

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Fab
            color="primary"
            aria-label="edit"
            size="small"
            onClick={() => setIsAddingNewToDo(!isAddingNewToDo)}
          >
            {isAddingNewToDo ? <CancelIcon /> : <AddIcon />}
          </Fab>
        </ListItemIcon>

        <StyledAlert severity="info">
          {(() => {
            if (isAddingNewToDo) {
              return (
                <StyledForm
                  noValidate
                  autoComplete="off"
                  onSubmit={addNewTodo}
                  disabled={isLoadingNewToDo}
                >
                  <TextField
                    id="standard-basic"
                    disableRipple={true}
                    disabled={isLoadingNewToDo}
                    onChange={event => setNewToDo(event.target.value)}
                    value={newToDo}
                    autoFocus
                    style={{
                      width: "100%"
                    }}
                  />
                </StyledForm>
              );
            }

            return (
              <React.Fragment>
                <AlertTitle>
                  These are your to-do's. You need to complete all task's to
                  complete a task.
                </AlertTitle>
              </React.Fragment>
            );
          })()}
        </StyledAlert>
      </ListItem>

      <VerticalSpacer />

      {(() => {
        if (todos && todos.length) {
          return todos
            .slice(0)
            .reverse()
            .map(value => {
              return (
                <StyledListItem key={value.id}>
                  <ListItemIcon>
                    <Checkbox
                      id={value.id}
                      edge="start"
                      checked={value.isDone}
                      disableRipple
                      onClick={handleToggle(value)}
                    />
                  </ListItemIcon>

                  <ListCustomAction todo={value} />
                </StyledListItem>
              );
            });
        } else {
          return (
            <Alert severity="error" action={<Button>Add New To Do</Button>}>
              This task doesn't have any to do. Creat a new one.
            </Alert>
          );
        }
      })()}
    </List>
  );
};

export default ToDo;

const VerticalSpacer = styled.div`
  height: 30px;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
`;

const TagsHolder = styled.div`
  padding: 10px 0;
`;

const StyledListItem = styled(ListItem)`
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-top: 20px;
  padding-left: 40px;
  background-color: rgb(232, 244, 253);
`;

const StyledListItemSecondaryAction = styled(ListItemSecondaryAction)`
  top: 30%;
  right: 40px;
`;

const StyledAlert = styled(Alert)`
  width: 100%;
  padding: 6px 16px 0px 16px;
`;

const StyledForm = styled.form`
  width: 100%;
`;
