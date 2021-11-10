import React from 'react';
import myFetch from '../components/fetcher';

const loggingOut = (token) => {
  myFetch('POST', '/user/auth/logout', token, null)
    .then((data) => {
      console.log('Successfully logged out');
    })
    .catch((data) => {
      console.log('Not successful in logging out');
    })
}

const logoutButton = (token) => {
  <button onClick={() => loggingOut(token)}>Logout</button>
}

export default logoutButton;
