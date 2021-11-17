import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import myFetch from './fetcher';

BasicMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function BasicMenu ({ isLoggedIn, setLoggedIn }) {
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
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon></AccountCircleIcon>
      </Button>
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
        <MenuItem onClick={handleHostedListings}>MyListings</MenuItem>
        <MenuItem onClick={() => handleLoggingOut(isLoggedIn, setLoggedIn)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
