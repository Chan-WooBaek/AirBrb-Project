import React from 'react';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';

const ListingsScreen = () => {
  return (
    <div>
      ListingsScreen <br />
      {localStorage.getItem('token') !== 'null'
        ? <>
            <LogoutButton></LogoutButton>
            <Link to="/">Listings</Link>
            <Link to="/hostedListings">MyListings</Link>
          </>
        : 'Not LoggedIn'
      }
    </div>
  );
}

export default ListingsScreen;
