import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

export default function GuestMenu () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <AccountCircleIcon></AccountCircleIcon>
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
        <Link to='../listings' style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={handleClose}>Listings</MenuItem></Link>
        <Link to='../register' style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={handleClose}>Register</MenuItem></Link>
        <Link to='../login' style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={handleClose}>Login</MenuItem></Link>
      </Menu>
    </div>
  );
}
