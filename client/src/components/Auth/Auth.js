import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
    this.redirectIfAuthenticated = this.redirectIfAuthenticated.bind(this);
    this.redirectIfNotAuthenticated = this.redirectIfNotAuthenticated.bind(
      this
    );
  }

  componentDidMount() {
    if (!this.state.auth) this.redirectIfAuthenticated();
  }

  signIn = async ({ email, password }) => {
    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_AUTH_BASE_URL
      });

      const { data: response } = await api.post(`token`, {
        username: email,
        password,
        grant_type: "password",
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET
      });

      if (response.access_token) {
        this.setState(prevState => {
          return {
            ...prevState,
            auth: {
              authToken: response.access_token,
              isLoggedIn: true
            }
          };
        });

        toast.info("Welcome Back to your account.");

        this.props.history.push(`/dashboard`);
      }
    } catch (error) {
      toast.error("Something is not right. Do you have an account?");
    }
  };

  register = async user => {
    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL
      });

      const { data: response } = await api.post(`register`, user);

      if (response.success === true) {
        this.setState({
          auth: {
            authToken: response.access_token,
            isLoggedIn: true
          }
        });

        toast.info("Account created successfully.");

        this.props.history.push("/dashboard");
      }
    } catch (error) {
      toast.error(
        "We are unable to create your account. Please try different email address."
      );
    }
  };

  signOut = () => {
    this.setState({
      auth: null
    });

    toast.info("You are now logged out from your account.");
  };

  redirectIfNotAuthenticated = () =>
    !this.state.auth && this.props.history.push("/login");

  redirectIfAuthenticated = () =>
    this.state.auth && this.props.history.push("/dashboard");

  render() {
    return (
      <AuthContext.Provider
        value={{
          auth: this.state,
          register: this.register,
          signIn: this.signIn,
          signOut: this.signOut,
          redirectIfNotAuthenticated: this.redirectIfNotAuthenticated,
          redirectIfAuthenticated: this.redirectIfAuthenticated
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(Auth);
