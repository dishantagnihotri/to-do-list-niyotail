import { useMemo, useContext } from "react";
import axios from "axios";

import AuthContext from "../contexts/AuthContext";

const DEFAULT_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useApi = baseURL => {
  const { auth } = useContext(AuthContext);

  const api = useMemo(() => {
    if (auth && auth.auth && auth.auth.authToken) {
      const apiItem = axios.create({
        baseURL: baseURL || DEFAULT_BASE_URL,
        headers: {
          Authorization: `Bearer ${auth.auth.authToken}`,
          Accept: "application/json"
        }
      });

      return apiItem;
    }

    // apiItem.interceptors.request.use(async config => {
    //   if (auth) {
    //     // eslint-disable-next-line no-param-reassign
    //     config.headers = {
    //       Authorization: `Bearer ${auth.authToken}`,
    //       Accept: "application/json"
    //     };
    //   }
    //   return config;
    // });
  }, [baseURL, auth]);

  return api;
};

export default useApi;
