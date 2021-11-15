import React from 'react';
import CreateListingForm from '../screens/CreateListingScreen';
import EditButton from '../components/EditButton';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';
import ListingsDisplay from '../components/ListingsDisplay';
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
      <EditButton id={354395729}></EditButton>
      {isLoggedIn
        ? <>
            <LogoutButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LogoutButton>
            <Link to="/">Listings</Link>
            <Link to="/hostedListings">MyListings</Link>
            <ListingsDisplay></ListingsDisplay>
          </>
        : <>
            {'Not LoggedIn'}
          </>
      }
    </div>
  );
}
