import React from "react";

const AuthContext = React.createContext({
  authToken: null,
  register: null,
  signIn: null,
  signOut: null,
  user: null,
  userInfo: null
});

export default AuthContext;
