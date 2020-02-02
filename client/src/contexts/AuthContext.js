import React from "react";

const AuthContext = React.createContext({
  auth: null,
  register: null,
  signIn: null,
  signOut: null,
  redirectIfNotAuthenticated: null,
  redirectIfAuthenticated: null
});

export default AuthContext;
