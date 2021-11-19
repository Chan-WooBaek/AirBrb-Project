import React from 'react';
import myFetch from '../components/fetcher';
import PropTypes from 'prop-types';
import LoggedInAppBar from '../components/LoggedInAppBar';
import GuestAppBar from '../components/GuestAppBar';
import { useNavigate } from 'react-router-dom';

LoginScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function LoginScreen ({ isLoggedIn, setLoggedIn }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const moveTo = useNavigate();

  const LoginForm = (e) => {
    const body = {
      email: e.email,
      password: e.password,
    }
    myFetch('POST', 'user/auth/login', null, body)
      .then((data) => {
        console.log('Successfully logged in');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', e.email);
        localStorage.setItem('isLoggedIn', true);
        e.setLoggedIn(true);
        // (localStorage.getItem('token')) to get token
      })
      .catch((data) => {
        console.log('Not successful in logging in');
      })
    moveTo('../listings', { replace: true });
  }

  return (
    <div>
      {isLoggedIn
        ? <>
            <LoggedInAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LoggedInAppBar>
          </>
        : <>
            <GuestAppBar></GuestAppBar>
            <h1>Login Form</h1>
            Email<input name="loginEmail" type="text" onChange={(e) => setEmail(e.target.value)} /><br/>
            Password<input name="loginPassword" type="text" onChange={(e) => setPassword(e.target.value)} /><br/>
            <button name="loginSubmitButton" onClick={() => LoginForm({ email: email, password: password, isLoggedIn: isLoggedIn, setLoggedIn: setLoggedIn })}>Submit</button>
          </>
      }
    </div>
  );
}
