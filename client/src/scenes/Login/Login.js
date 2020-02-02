import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("dishant@dishant.com");
  const [password, setPassword] = useState("1234567890");

  const { auth, signIn, redirectIfAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    redirectIfAuthenticated();
  }, [auth]);

  const handleSubmit = event => {
    event.preventDefault();

    signIn({
      email,
      password
    });
  };

  return (
    <Container>
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>

        <Typography component="h1" variant="h5">
          Login to Account
        </Typography>
        <br />
        <br />
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => setEmail(event.target.value)}
            value={email}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!email.length && !password.length}
          >
            Sign In
          </Button>
          <br />
          <br />
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={"/register"} variant="body2">
                {"Don't have an account? Register."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: auto;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: #1a73e8;
  margin: 20px 0;
`;
