import React from 'react';
// import CreateListingForm from '../screens/CreateListingScreen';
// import EditButton from '../components/EditButton';
import BookingRequestScreenDisplay from '../components/BookingRequestScreenDisplay';
import LoggedInAppBar from '../components/LoggedInAppBar';
import PropTypes from 'prop-types';

BookingRequestScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function BookingRequestScreen ({ isLoggedIn, setLoggedIn }) {
  return (
    <div>
      <LoggedInAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LoggedInAppBar>
      <h1>Bookings Page</h1>
      <hr></hr>
      <BookingRequestScreenDisplay></BookingRequestScreenDisplay>
    </div>
  );
}
