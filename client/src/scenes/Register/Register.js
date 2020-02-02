import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import AuthContext from "../../contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useContext(AuthContext);

  const { auth } = useContext(AuthContext);

  if (auth && auth.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  const registerUser = event => {
    event.preventDefault();

    if (password === confirmPassword) {
      register({
        name,
        email,
        password,
        confirm_password: confirmPassword
      });
    } else {
      // -show toast.
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form noValidate onSubmit={event => registerUser(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Full Name"
                onChange={event => setName(event.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
                onChange={event => setConfirmPassword(event.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              !name.length ||
              email.length <= 6 ||
              !password.length ||
              !confirmPassword.length
            }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
