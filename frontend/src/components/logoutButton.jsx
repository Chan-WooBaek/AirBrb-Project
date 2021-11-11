import React from 'react';
import myFetch from './fetcher';
// import { BrowserRouter as Link } from 'react-router-dom';

const loggingOut = (token) => {
  myFetch('POST', 'user/auth/logout', token, null)
    .then((data) => {
      console.log('Successfully logged out');
      localStorage.setItem('token', null)
    })
    .catch((data) => {
      console.log('Not successful in logging out');
    })
}

const LogoutButton = () => {
  const token = localStorage.getItem('token');
  return (
    <button onClick={() => loggingOut(token)}>Logout</button>
  )
}

export default LogoutButton;
