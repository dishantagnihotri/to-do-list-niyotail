import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import ListsContext from "../../contexts/ListsContext";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  textArea: {
    width: "70%"
  }
}));

export const ListCustomAction = ({ todo }) => {
  const classes = useStyles();

  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const { deleteTodos, updateTodos } = useContext(ListsContext);

  const deleteTodo = async value => {
    const isNewTodoAdded = await deleteTodos(value);
    console.log("returned delted value", isNewTodoAdded);
  };

  const updateTodo = async (event, value) => {
    event.preventDefault();
    const isTodoUpdated = await updateTodos({
      ...value,
      title
    });

    if (isTodoUpdated) {
      setIsEditingTodo(false);
    }
    // show error
  };

  return (
    <React.Fragment>
      {(() => {
        if (isEditingTodo) {
          return (
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={event => updateTodo(event, todo)}
              onBlur={event => updateTodo(event, todo)}
              disabled={isLoading}
            >
              <TextField
                id="standard-basic"
                label="Standard"
                className={classes.textArea}
                disabled={isLoading}
                onChange={event => setTitle(event.target.value)}
                value={title}
              />
            </form>
          );
        }

        return <ListItemText primary={title} />;
      })()}

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={event => setIsEditingTodo(true)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => deleteTodo(todo)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </React.Fragment>
  );
};

const ToDo = ({ todos }) => {
  // need list id
  const classes = useStyles();
  const { updateTodos, addNewTodos } = useContext(ListsContext);

  const [isAddingNewToDo, setIsAddingNewToDo] = useState(false);
  const [isLoadingNewToDo, setIsLoadingNewToDo] = useState(false);

  const [newToDo, setNewToDo] = useState(null);

  const handleToggle = value => () => {
    console.log(" before", value);

    value.isDone = !value.isDone;
    console.log("after", value);
    updateTodos(value);
  };

  const addNewTodo = async event => {
    event.preventDefault();
    setIsLoadingNewToDo(true);

    if (newToDo && newToDo.length) {
      const isNewTodoAdded = await addNewTodos(newToDo, 2);
      // update list id.

      if (isNewTodoAdded) {
        setIsLoadingNewToDo(false);
      }
    }
  };

  return (
    <List className={classes.checkboxList}>
      {(() => {
        if (todos.length) {
          return todos.map(value => {
            return (
              <ListItem key={value.id} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.isDone}
                    disableRipple
                    onClick={handleToggle(value)}
                  />
                </ListItemIcon>

                <ListCustomAction todo={value} />
              </ListItem>
            );
          });
        } else {
          return "No list data,";
        }
      })()}

      {(() => {
        if (isAddingNewToDo) {
          return (
            <ListItem role={undefined} dense>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={addNewTodo}
                disabled={isLoadingNewToDo}
              >
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  className={classes.textArea}
                  disabled={isLoadingNewToDo}
                  onChange={event => setNewToDo(event.target.value)}
                  value={newToDo}
                />
              </form>
            </ListItem>
          );
        }
      })()}

      <ListItem button onClick={() => setIsAddingNewToDo(true)}>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="Add new todo" />
      </ListItem>
    </List>
  );
};

export default ToDo;
