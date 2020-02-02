import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/AuthContext";

class Auth extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    auth: null
  };

  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.register = this.register.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const authState = localStorage["auth"];

    if (authState) {
      const auth = JSON.parse(authState);

      if (auth && auth.isLoggedIn) {
        this.setState({
          auth: {
            authToken: auth.authToken,
            isLoggedIn: auth.isLoggedIn
          }
        });
      }
      // - Validate Auth Token.
    }
  }

  signIn = async ({ email, password }) => {
    try {
      const api = axios.create({
        baseURL: "http://localhost:8000/oauth/"
      });

      const { data: response } = await api.post(`token`, {
        username: email,
        password,
        grant_type: "password",
        client_id: 2,
        client_secret: "Godsqrfgs2HwAwgutBx5Exd9DNfkd6Pw3BjHCdkV"
      });

      if (response.access_token) {
        let auth = {
          authToken: response.access_token,
          isLoggedIn: true
        };

        localStorage["auth"] = JSON.stringify(auth);

        this.setState(auth);
        this.props.history.push(`/dashboard`);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  register = async user => {
    try {
      const api = axios.create({
        baseURL: "http://localhost:8000/api/"
      });

      const { data: response } = await api.post(`register`, user);

      if (response.success === true) {
        let auth = {
          authToken: response.data.token,
          user: response.data.user,
          isLoggedIn: true
        };

        localStorage["auth"] = JSON.stringify(auth);

        this.setState(auth);
        this.props.history.push(`/dashboard`);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  signOut = () => {
    this.setState({
      auth: null
    });

    localStorage.clear();
  };

  redirectIfNotAuthenticated = () => {
    if (!this.state.auth) {
      window.location = "/login";
    }
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          auth: this.state,
          register: this.register,
          signIn: this.signIn,
          signOut: this.signOut,
          redirectIfNotAuthenticated: this.redirectIfNotAuthenticated
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(Auth);
