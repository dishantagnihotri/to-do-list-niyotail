import React, { useState, useContext } from "react";
import styled from "styled-components";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import DnsIcon from "@material-ui/icons/Dns";
import AuthContext from "../../contexts/AuthContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { signOut } = useContext(AuthContext);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => signOut();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton color="inherit" edge="start">
          <DnsIcon />
        </IconButton>

        <Typography variant="h6">ToDo</Typography>

        <Spacer />

        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 200
              }
            }}
          >
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};
export default Header;

const StyledAppBar = styled(AppBar)`
  color: #333;
  background-color: #fafafa;
  box-shadow: none;
  border-bottom: 1px solid #dadce0;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;
