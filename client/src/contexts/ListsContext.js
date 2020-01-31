import React from "react";

const ListsContext = React.createContext({
  lists: null,
  addNewLists: null,
  deleteLists: null,
  updateLists: null
});

export default ListsContext;
