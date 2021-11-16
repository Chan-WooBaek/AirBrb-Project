import React from 'react';
import ListingsDisplay from '../components/ListingsDisplay'
import PropTypes from 'prop-types';
import LoggedInAppBar from '../components/LoggedInAppBar';
import GuestAppBar from '../components/GuestAppBar';

ListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function ListingsScreen ({ isLoggedIn, setLoggedIn }) {
  return (
    <div>
      {isLoggedIn
        ? <>
            <LoggedInAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LoggedInAppBar>
            <ListingsDisplay/>
          </>
        : <>
            <GuestAppBar></GuestAppBar>
            <ListingsDisplay/>
          </>
      }
    </div>
  );
}
