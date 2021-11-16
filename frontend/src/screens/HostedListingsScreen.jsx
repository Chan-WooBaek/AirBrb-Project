import React from 'react';
import CreateListingForm from '../screens/CreateListingScreen';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';
import HostedListingsDisplay from '../components/HostedListingsDisplay';
import PropTypes from 'prop-types';

HostedListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function HostedListingsScreen ({ isLoggedIn, setLoggedIn }) {
  return (
    <div>
      HostedListingsScreen
      <CreateListingForm></CreateListingForm>
      {isLoggedIn
        ? <>
            <LogoutButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LogoutButton>
            <Link to="/">Listings</Link>
            <Link to="/hostedListings">MyListings</Link>
            <HostedListingsDisplay></HostedListingsDisplay>
          </>
        : <>
            {'Not LoggedIn'}
          </>
      }
    </div>
  );
}
