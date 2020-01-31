import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import ListsContext from "../../contexts/ListsContext";
import ToDo from "../ToDo/ToDo";
import useApi from "../../hooks/useApi";
import List from "../../scenes/List";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const Lists = () => {
  const classes = useStyles();

  const [isListsLoading, setIsListsLoading] = useState(true);
  const [lists, setLists] = useState([]);

  const api = useApi();

  useEffect(() => {
    getAllLists();
  }, []);

  const getAllLists = async () => {
    try {
      setIsListsLoading(true);
      const response = await api.get(`lists`);

      if (response.status === 200) {
        if (response.data && response.data.data.length) {
          console.log("list", response.data);
          setLists(response.data.data);
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      // - Disable loader
      console.log("disabling");
      setIsListsLoading(false);
      console.log("disabled");
    }
  };

  const addNewLists = value => {
    console.log("adding", value);
  };

  const deleteLists = async value => {
    console.log("deleting", value);

    try {
      setIsListsLoading(true);
      const response = await api.delete(`lists/value.id`);

      if (response.status === 200) {
        console.log("list", response.data);
        setLists(prevState => prevState.filter(list => list.id !== value.id));
      }
    } catch (error) {
      console.log({ error });
    } finally {
      // - Disable loader
      console.log("disabling");
      setIsListsLoading(false);
      console.log("disabled");
    }
  };

  const updateLists = value => {
    console.log("updating", value);
  };

  const addNewTodos = async (title, lists_id) => {
    const mappedData = {
      title,
      description: "asd",
      isDone: 0,
      lists_id
    };

    try {
      const response = await api.post(`todos`, mappedData);
      console.log(response);

      if (response.status === 200) {
        // if (response.data && response.data.data.length) {
        //   console.log("list", response.data);
        //   setLists(response.data.data);
        // }
        // Update state/
        return true;
      }
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const deleteTodos = async value => {
    console.log("deleting", value);
    try {
      const response = await api.delete(`todos/${value.id}`);
      console.log(response);

      if (response.status === 200) {
        setLists(prevState =>
          prevState.map(list => {
            if (list.id === value.lists_id) {
              return {
                ...list,
                todos: list.todos.filter(todo => todo.id !== value.id)
              };
            }
            return list;
          })
        );
        return true;
      }
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const updateTodos = async value => {
    console.log("updating", value);

    try {
      const response = await api.put(`todos/${value.id}`, value);
      console.log(response);

      if (response.status === 200) {
        setLists(prevState =>
          prevState.map(list => {
            if (list.id === value.lists_id) {
              return {
                ...list,
                todos: list.todos.map(todo => {
                  if (todo.id === value.id) {
                    return {
                      ...todo,
                      isDone: value.isDone,
                      title: value.title,
                      description: value.description
                    };
                  }

                  return todo;
                })
              };
            }
            return list;
          })
        );
        return true;
      }
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  if (isListsLoading) {
    return "loading lists...";
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
        {value => {
          if (value.lists && value.lists.length) {
            return value.lists.map(list => <List list={list} />);
          }
        }}
      </ListsContext.Consumer>
    </ListsContext.Provider>
  );
};
export default Lists;
