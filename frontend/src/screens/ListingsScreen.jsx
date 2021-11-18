import React from 'react';
import ListingsDisplay from '../components/ListingsDisplay'
import PropTypes from 'prop-types';
import LoggedInAppBar from '../components/LoggedInAppBar';
import GuestAppBar from '../components/GuestAppBar';

ListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
}

export default function ListingsScreen ({ isLoggedIn, setLoggedIn, searchString, setSearchString }) {
  return (
    <div>
      {isLoggedIn
        ? <>
            <LoggedInAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} searchString={searchString} setSearchString={setSearchString}></LoggedInAppBar>
            <ListingsDisplay searchString={searchString} setSearchString={setSearchString}/>
          </>
        : <>
            <GuestAppBar></GuestAppBar>
            <ListingsDisplay/>
          </>
      }
    </div>
  );
}
