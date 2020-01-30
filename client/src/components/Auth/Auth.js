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
    authToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNDhmMDRiNWU2NmVjZWYzNDJlMTc3NWIzMDUzMWYwOTQzYWQ4MjA5MzY5NDgyYjdiYjUyZDAyYTY2OGNiNDEyNDJlYmFhNzdiMmNjYjY0NDUiLCJpYXQiOjE1ODAzODgwMjksIm5iZiI6MTU4MDM4ODAyOSwiZXhwIjoxNjEyMDEwNDI5LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.GpHtIYiBnUADTSDszx8Vcvpk5D_OMpO51khMhRQZ6a3GzjiqZtbMLU8O1XWmalv6zS0YgLfngZWUSwESqyZC2d7fL1ngP7ba6SnAWTFQDZ0BNseoo2IYFJzE9HXV-Gfe8_SrW53TqGA6yu1bYUzdroodzP9g4LmWG4JiXOe1SfvcyKbhQKcXvCELZyv7yfbFMj0QKVQ6_SAU13hbp5BY_7SO5kF_YCNxbiVaS7E2q0yrtnehPtHfzo6eaYDVttI9QgpUWc_LzIQFwoiGsMpKN6WO5Nob77hazhiJ4-neMDziKQ3a1wFAglG-JeOPjKal8zi6CZYTyPPRW240wyJBB5m2LOq4XFI5dNcsm2vkkxY48y8GATuV6DFZOW3tRY8N_JdBlcmDy5xIyAM1Ugg02hML-uDm8gmLBlczqf-0pRmWhldntKTRWsNAnF7xzDA3K_Ar66hoUm8Qp__UwSwM5ufiFAEYyn7pPOLT7e2pgFCQTFQNdGe2kNF6b3mmMdZ58dshe-D3QRpb9tCmbbIMAw47JzVztWsMdrNA0L2JiOP3WV5-TkGxIXedgpIPCSeLwgZNn8G4rs0BzuwK7zGAjQF5hZRRPDO8MM5vOEccxbtV6nVDuLw5US9ia-G0Ov1uPkqGAs1RkCzwUW9Q6rIl7tWaCCJspmt8lVgNca78qJU",
    user: null,
    userInfo: null,
    loadingUserInfo: null
  };

  async componentDidMount() {
    try {
      //   const user = await Authenticator.currentAuthenticatedUser();
      let user = {
        user: "ads",
        authToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNDhmMDRiNWU2NmVjZWYzNDJlMTc3NWIzMDUzMWYwOTQzYWQ4MjA5MzY5NDgyYjdiYjUyZDAyYTY2OGNiNDEyNDJlYmFhNzdiMmNjYjY0NDUiLCJpYXQiOjE1ODAzODgwMjksIm5iZiI6MTU4MDM4ODAyOSwiZXhwIjoxNjEyMDEwNDI5LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.GpHtIYiBnUADTSDszx8Vcvpk5D_OMpO51khMhRQZ6a3GzjiqZtbMLU8O1XWmalv6zS0YgLfngZWUSwESqyZC2d7fL1ngP7ba6SnAWTFQDZ0BNseoo2IYFJzE9HXV-Gfe8_SrW53TqGA6yu1bYUzdroodzP9g4LmWG4JiXOe1SfvcyKbhQKcXvCELZyv7yfbFMj0QKVQ6_SAU13hbp5BY_7SO5kF_YCNxbiVaS7E2q0yrtnehPtHfzo6eaYDVttI9QgpUWc_LzIQFwoiGsMpKN6WO5Nob77hazhiJ4-neMDziKQ3a1wFAglG-JeOPjKal8zi6CZYTyPPRW240wyJBB5m2LOq4XFI5dNcsm2vkkxY48y8GATuV6DFZOW3tRY8N_JdBlcmDy5xIyAM1Ugg02hML-uDm8gmLBlczqf-0pRmWhldntKTRWsNAnF7xzDA3K_Ar66hoUm8Qp__UwSwM5ufiFAEYyn7pPOLT7e2pgFCQTFQNdGe2kNF6b3mmMdZ58dshe-D3QRpb9tCmbbIMAw47JzVztWsMdrNA0L2JiOP3WV5-TkGxIXedgpIPCSeLwgZNn8G4rs0BzuwK7zGAjQF5hZRRPDO8MM5vOEccxbtV6nVDuLw5US9ia-G0Ov1uPkqGAs1RkCzwUW9Q6rIl7tWaCCJspmt8lVgNca78qJU"
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
