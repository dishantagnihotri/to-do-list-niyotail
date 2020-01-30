import React, { useContext, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import Header from "./../../components/Header";
import List from "./../../components/List";

import useApi from "./../../hooks/useApi";

const Dashboard = () => {
  const [lists, setLists] = useState(null);

  const api = useApi();

  useEffect(() => {
    getListFromApi();
  }, []);

  const getListFromApi = async () => {
    try {
      const response = await api.get(`lists`);

      if (response.status === 200) {
        if (response.data && response.data.data.length) {
          setLists(response.data.data);
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      // - Disable loader
    }
  };

  return (
    <React.Fragment>
      <Header />

      {(() => {
        if (lists && lists.length) {
          return lists.map(list => {
            return (
              <List
                title={list.title}
                updated_at={list.updated_at}
                key={list.id}
              />
            );
          });
        }
      })()}
    </React.Fragment>
  );
};
export default Dashboard;
