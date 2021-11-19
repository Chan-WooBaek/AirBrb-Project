import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

ProfileMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function ProfileMenu ({ isLoggedIn, setLoggedIn }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListings = () => {
    setAnchorEl(null);
    moveTo('../listings', { replace: true })
  }

  const handleRegister = () => {
    setAnchorEl(null);
    moveTo('../register', { replace: true })
  }

  const handleLogin = () => {
    setAnchorEl(null);
    moveTo('../login', { replace: true })
  }

  const moveTo = useNavigate();

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="open drawer"
        onClick={handleClick}
      >
        <AccountCircleIcon name="guestAccountCircleIcon"></AccountCircleIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleListings}>Listings</MenuItem>
        <MenuItem name="registerButton" onClick={handleRegister}>Register</MenuItem>
        <MenuItem name="loginButton" onClick={handleLogin}>Login</MenuItem>
      </Menu>
    </div>
  );
}
