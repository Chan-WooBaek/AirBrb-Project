import React from 'react';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';
import ListingsDisplay from '../components/ListingsDisplay'
import PropTypes from 'prop-types';

ListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function ListingsScreen ({ isLoggedIn, setLoggedIn }) {
  return (
    <div>
      ListingsScreen <br />
      {isLoggedIn
        ? <>
            <Link to="/">Listings</Link>
            <Link to="/hostedListings">MyListings</Link>
            <LogoutButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LogoutButton>
            <ListingsDisplay/>
          </>
        : 'Not LoggedIn'
      }
    </div>
  );
}
