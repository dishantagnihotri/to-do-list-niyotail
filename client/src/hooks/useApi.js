import { useMemo, useContext } from "react";
import axios from "axios";

import AuthContext from "../contexts/AuthContext";

const DEFAULT_BASE_URL = "http://localhost:8000/api/";

const useApi = baseURL => {
  const { authToken } = useContext(AuthContext);
  console.log({ authToken });

  const api = useMemo(() => {
    const apiItem = axios.create({
      baseURL: baseURL || DEFAULT_BASE_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    });

    apiItem.interceptors.request.use(async config => {
      const user = {}; // function to get user data.

      // if (user) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      };
      // }

      return config;
    });

    return apiItem;
  }, [baseURL, authToken]);

  return api;
};

export default useApi;
