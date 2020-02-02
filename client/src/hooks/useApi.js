import { useMemo, useContext } from "react";
import axios from "axios";

import AuthContext from "../contexts/AuthContext";

const DEFAULT_BASE_URL = "http://localhost:8000/api/";

const useApi = baseURL => {
  const { auth } = useContext(AuthContext);
  console.log("inside api -", auth);

  const api = useMemo(() => {
    const apiItem = axios.create({
      baseURL: baseURL || DEFAULT_BASE_URL,
      headers: {
        // Authorization: `Bearer ${auth.auth.authToken}`,
        Accept: "application/json"
      }
    });

    apiItem.interceptors.request.use(async config => {
      if (auth) {
        // eslint-disable-next-line no-param-reassign
        config.headers = {
          Authorization: `Bearer ${auth.authToken}`,
          Accept: "application/json"
        };
      }
      return config;
    });

    return apiItem;
  }, [baseURL, auth]);

  return api;
};

export default useApi;
