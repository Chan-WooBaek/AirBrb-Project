import React from 'react';
import ListingsDisplay from '../components/ListingsDisplay'
import PropTypes from 'prop-types';
import BasicMenu from '../components/ProfileMenu'

ListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function ListingsScreen ({ isLoggedIn, setLoggedIn }) {
  return (
    <div>
      ListingsScreen
      {isLoggedIn
        ? <>
            <BasicMenu isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></BasicMenu>
            <ListingsDisplay/>
          </>
        : 'Not LoggedIn'
      }
    </div>
  );
}
