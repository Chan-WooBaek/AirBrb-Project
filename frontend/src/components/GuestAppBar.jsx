import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import GuestMenu from '../components/GuestMenu';

GuestAppBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function GuestAppBar ({ isLoggedIn, setLoggedIn }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <GuestMenu></GuestMenu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
