import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import myFetch from './fetcher';
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

  const handleHostedListings = () => {
    setAnchorEl(null);
    moveTo('../hostedListings', { replace: true })
  }

  const moveTo = useNavigate();

  function handleLoggingOut (isLoggedIn, setLoggedIn) {
    setAnchorEl(null);
    const token = localStorage.getItem('token');
    myFetch('POST', 'user/auth/logout', token, null)
      .then((data) => {
        console.log('Successfully logged out');
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        localStorage.setItem('isLoggedIn', false);
        setLoggedIn(false);
      })
      .catch((data) => {
        console.log('Not successful in logging out');
        console.log(isLoggedIn)
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        localStorage.setItem('isLoggedIn', false);
        setLoggedIn(false);
      })
    moveTo('../listings', { replace: true });
  }

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
        <AccountCircleIcon name="userAccountCircleIcon"></AccountCircleIcon>
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
        <MenuItem name="myListingsButton" onClick={handleHostedListings}>MyListings</MenuItem>
        <MenuItem onClick={() => handleLoggingOut(isLoggedIn, setLoggedIn)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
