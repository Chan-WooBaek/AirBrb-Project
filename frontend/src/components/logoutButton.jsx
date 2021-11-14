import React from 'react';
import myFetch from './fetcher';
import { Link } from 'react-router-dom';

const loggingOut = () => {
  const token = localStorage.getItem('token');
  myFetch('POST', 'user/auth/logout', token, null)
    .then((data) => {
      console.log('Successfully logged out');
      localStorage.setItem('token', null);
      localStorage.setItem('user', null);
      console.log(localStorage.getItem('token'))
      window.location.reload()
      // { <Navigate replace to="/listings"/> }
    })
    .catch((data) => {
      alert('Already logged out');
      console.log('Not successful in logging out');
    })
}

const LogoutButton = () => {
  return (
    <Link to="/listings" onClick={() => window.location.reload()}>
      <button onClick={() => loggingOut()}>Logout</button>
    </Link>
  )
}

export default LogoutButton;
