import React from 'react';
import CreateListingForm from '../screens/CreateListingScreen';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';

const HostedListingsScreen = () => {
  return (
    <div>
      HostedListingsScreen
      <CreateListingForm></CreateListingForm>
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

export default HostedListingsScreen;
