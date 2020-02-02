import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Paper
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import AuthContext from "../../contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { auth, redirectIfAuthenticated, register } = useContext(AuthContext);

  useEffect(() => {
    redirectIfAuthenticated();
  }, [auth]);

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
      toast.warn("Please match both the passwords");
    }
  };

  return (
    <Container>
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>

        <Typography component="h1" variant="h5">
          Create an Account
        </Typography>
        <br />
        <br />

        <form noValidate onSubmit={event => registerUser(event)}>
          <TextField
            name="name"
            variant="outlined"
            required
            fullWidth
            label="Enter your Full Name"
            onChange={event => setName(event.target.value)}
            autoFocus
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            onChange={event => setEmail(event.target.value)}
            margin="normal"
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
            margin="normal"
          />

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
            margin="normal"
          />
          <br />
          <br />
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
            Register
          </Button>
          <br />
          <br />

          <Grid container justify="flex-end">
            <Grid item>
              <Link to={"/login"} variant="body2">
                Already have an account? Sign in.
              </Link>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default Register;

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
