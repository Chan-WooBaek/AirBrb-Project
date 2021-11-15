import React from 'react';
import myFetch from '../components/fetcher';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = (e) => {
  console.log(e);
  const body = {
    email: e.email,
    password: e.password,
  }
  myFetch('POST', 'user/auth/login', null, body)
    .then((data) => {
      console.log('Successfully logged in');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', e.email);
      e.setLoggedIn(true);
      console.log(e.loggedIn)
      // (localStorage.getItem('token')) to get token
    })
    .catch((data) => {
      console.log('Not successful in logging in');
    })
}

LoginScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function LoginScreen ({ isLoggedIn, setLoggedIn }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div>
      {isLoggedIn
        ? <>
            LoggedIn
            <LogoutButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LogoutButton>
            <Link to="/">Listings</Link>
            <Link to="/hostedListings">MyListings</Link>
          </>
        : <>
            <h1>Login Form</h1>
            Email<input type="text" onChange={(e) => setEmail(e.target.value)} /><br/>
            Password<input type="text" onChange={(e) => setPassword(e.target.value)} /><br/>
            <button onClick={() => LoginForm({ email: email, password: password, isLoggedIn: isLoggedIn, setLoggedIn: setLoggedIn })}>Submit</button>
          </>
      }
    </div>
  );
}
