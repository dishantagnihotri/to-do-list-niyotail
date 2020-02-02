import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Grid, Fab, Typography, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";

import CreateNewList from "../../components/CreateNewList";
import ListsContext from "../../contexts/ListsContext";
import AuthContext from "../../contexts/AuthContext";
import useApi from "../../hooks/useApi";
import List from "../../scenes/List";

const Lists = () => {
  const [isListsLoading, setIsListsLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [isCreateNewListOpen, setIsCreateNewListOpen] = useState(false);

  const api = useApi();

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getAllLists();
  }, [auth]);

  const toggleCreateNew = () => setIsCreateNewListOpen(!isCreateNewListOpen);

  const getAllLists = async () => {
    try {
      setIsListsLoading(true);

      const { data: response } = await api.get(`lists`);

      if (response && response.data.length) {
        setLists(response.data);

        toast.success("These are your latest updates.");
      }
    } catch (error) {
      console.log({ error });

      toast.error("Unable to fetch updates. Please login again.");
    } finally {
      setIsListsLoading(false);
    }
  };

  const addNewLists = async list => {
    try {
      setIsListsLoading(true);
      const { data: response } = await api.post(`lists`, list);

      if (response && response.data) {
        response.data.todos = [];
        setLists(prevState => prevState.concat(response.data));
        toast.success("New task created.");
      }
    } catch (error) {
      console.log({ error });
      toast.error(error.message);

      if (error.data) {
        error.data.forEach(err => {
          toast.error(err[0]);
        });
      }
    } finally {
      setIsCreateNewListOpen(false);
      setIsListsLoading(false);
    }
  };

  const deleteLists = async id => {
    try {
      setIsListsLoading(true);
      const { status } = await api.delete(`lists/${id}`);

      if (status === 200) {
        setLists(prevState => prevState.filter(list => list.id !== id));
        toast.warn("Task Deleted");
      }
    } catch (error) {
      console.log({ error });
      toast.error(error.message);

      if (error.data) {
        error.data.forEach(err => {
          toast.error(err[0]);
        });
      }
    } finally {
      setIsListsLoading(false);
    }
  };

  const updateLists = value => {
    console.log("updating", value);
  };

  const addNewTodos = async todo => {
    try {
      const { data: response } = await api.post(`todos`, todo);

      if (response) {
        setLists(prevState =>
          prevState.map(list => {
            if (list.id === todo.lists_id) {
              return {
                ...list,
                todos: [...list.todos, response.data]
                // list.todos.length === 0
                //   ? list.todos.concat(response.data)
                //   : [response.data]
              };
            }

            return list;
          })
        );
        toast.success("To do added!");
      }
    } catch (error) {
      console.log({ error });
      toast.error(error.message);

      if (error.data) {
        error.data.forEach(err => {
          toast.error(err[0]);
        });
      }
    }
  };

  const deleteTodos = async todo => {
    try {
      const { status } = await api.delete(`todos/${todo.id}`);

      if (status === 200) {
        setLists(prevState =>
          prevState.map(list => {
            if (list.id === todo.lists_id) {
              return {
                ...list,
                todos: list.todos.filter(value => value.id !== todo.id)
              };
            }

            return list;
          })
        );

        toast.warn("To-do removed from task.");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const updateTodos = async todo => {
    try {
      const { status } = await api.put(`todos/${todo.id}`, todo);

      if (status === 200) {
        setLists(prevState =>
          prevState.map(list => {
            if (list.id === todo.lists_id) {
              return {
                ...list,
                todos: list.todos.map(value => {
                  if (value.id === todo.id) {
                    return {
                      ...value,
                      isDone: todo.isDone,
                      title: todo.title,
                      description: todo.description
                    };
                  }

                  return value;
                })
              };
            }
            return list;
          })
        );

        toast.success("ToDo updated.");
      }
    } catch (error) {
      console.log({ error });
      toast.error("Unable to update. Try again!");
    }
  };

  if (isListsLoading) {
    return (
      <StyledAlert severity="info">
        Validating Data. Please wait for a moment...
      </StyledAlert>
    );
  }

  return (
    <ListsContext.Provider
      value={{
        lists,
        getAllLists: getAllLists,
        addNewLists: addNewLists,
        deleteLists: deleteLists,
        updateLists: updateLists,
        addNewTodos: addNewTodos,
        deleteTodos: deleteTodos,
        updateTodos: updateTodos
      }}
    >
      <ListsContext.Consumer>
        {state => {
          if (state.lists) {
            return (
              <React.Fragment>
                <Grid container justify="space-between" alignItems="center">
                  <Grid container justify="flex-start" alignItems="center">
                    <Fab
                      color="primary"
                      aria-label="edit"
                      size="small"
                      onClick={toggleCreateNew}
                    >
                      <AddIcon />
                    </Fab>

                    <HasGutters>
                      <Typography variant="h5">Tasks</Typography>
                      <Typography variant="body1">
                        These are the task's. You can assign multiple to-do's
                        with a task.
                      </Typography>
                    </HasGutters>
                  </Grid>
                </Grid>

                <VerticalSpacer />

                <CreateNewList
                  isOpen={isCreateNewListOpen}
                  toggleOpen={toggleCreateNew}
                />

                {(() => {
                  if (state.lists.length)
                    return state.lists.map(list => (
                      <List key={list.id} list={list} />
                    ));

                  return (
                    <StyledAlert
                      severity="info"
                      action={
                        <Button
                          color="primary"
                          size="small"
                          onClick={toggleCreateNew}
                        >
                          CREATE NEW TASK
                        </Button>
                      }
                    >
                      You don't have any task right now.
                    </StyledAlert>
                  );
                })()}
              </React.Fragment>
            );
          }
        }}
      </ListsContext.Consumer>
    </ListsContext.Provider>
  );
};

export default Lists;

const VerticalSpacer = styled.div`
  height: 50px;
  display: block;
  width: 100%;
`;

const StyledAlert = styled(Alert)`
  width: 100%;
`;

const HasGutters = styled.div`
  margin-left: 20px;
`;
