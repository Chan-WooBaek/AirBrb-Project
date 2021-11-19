import React from 'react';
import CreateListingForm from '../screens/CreateListingScreen';
// import EditButton from '../components/EditButton';
import HostedListingsDisplay from '../components/HostedListingsDisplay';
import PropTypes from 'prop-types';
import LoggedInAppBar from '../components/LoggedInAppBar';

HostedListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function HostedListingsScreen ({ isLoggedIn, setLoggedIn }) {
  return (
    <div>
      <LoggedInAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LoggedInAppBar>
      {isLoggedIn
        ? <>
            <CreateListingForm></CreateListingForm>
            <HostedListingsDisplay></HostedListingsDisplay>
          </>
        : <>
            {'Not LoggedIn'}
          </>
      }
    </div>
  );
}
