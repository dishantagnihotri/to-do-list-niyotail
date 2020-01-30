import React from "react";
import PropTypes from "prop-types";
// import { get } from "lodash-es";
import { withRouter } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/AuthContext";
import ModeContext from "../../contexts/ModeContext";
import withContexts from "../../utils/withContext";

class Auth extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    setMode: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    verifyingAuth: true,
    authToken: null,
    user: null,
    userInfo: null,
    loadingUserInfo: null
  };

  async componentDidMount() {
    try {
      //   const user = await Authenticator.currentAuthenticatedUser();
      let user = {
        user: "ads",
        authToken: "something"
      };

      if (user) {
        this.setState(user, () => {
          //   this.fetchUserInfo();
        });
      }
    } catch (error) {
      this.setState({ user: null, authToken: null });
    } finally {
      this.setState({ verifyingAuth: false });
    }
  }

  register = async (name, email, password, confirm_password) => {
    return true;
  };

  signIn = async (email, password) => {
    return true;
  };

  fetchUserInfo = async () => {
    this.setState({
      loadingUserInfo: true
    });

    const { user, authToken } = this.state;

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        Authorization: authToken
      }
    });
  };

  signOut = async () => {};

  updateUserInfo = updatedUserInfo => {
    this.setState(
      state => ({
        userInfo: {
          ...state.userInfo,
          ...updatedUserInfo
        }
      }),
      () => {
        const { user, userInfo } = this.state;

        // -
      }
    );
  };

  render() {
    const { authToken, user, verifyingAuth } = this.state;

    if (verifyingAuth) {
      return <p>Verifying User...</p>;
    }

    return (
      <AuthContext.Provider
        value={{
          authToken,
          register: this.register,
          signIn: this.signIn,
          signOut: this.signOut,
          user
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withContexts([ModeContext])(withRouter(Auth));
