import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Paper,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const { auth, signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("d@d.ddd");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    checkLogin();
  }, [auth]);

  const checkLogin = () => {
    if (auth && auth.isLoggedIn) return <Redirect to="/dashboard" />;
  };

  const handleSubmit = event => {
    event.preventDefault();

    signIn({
      email,
      password
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <StyledPaper>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!email.length && !password.length}
          >
            Sign In
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
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

const StyledPaper = styled(Paper)`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
`;
