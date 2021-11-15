import React from 'react';
import myFetch from './fetcher';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

function loggingOut (isLoggedIn, setLoggedIn) {
  const token = localStorage.getItem('token');
  myFetch('POST', 'user/auth/logout', token, null)
    .then((data) => {
      console.log('Successfully logged out');
      localStorage.setItem('token', null);
      localStorage.setItem('user', null);
      console.log(localStorage.getItem('token'));
      setLoggedIn(false);
      // { <Navigate replace to="/listings"/> }
    })
    .catch((data) => {
      console.log('Not successful in logging out');
      console.log(isLoggedIn);
      setLoggedIn(false);
    })
}

LogoutButton.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
}
export default function LogoutButton ({ isLoggedIn, setLoggedIn }) {
  return (
    <Link to="/listings">
      <button onClick={() => loggingOut(isLoggedIn, setLoggedIn)}>Logout</button>
    </Link>
  )
}
