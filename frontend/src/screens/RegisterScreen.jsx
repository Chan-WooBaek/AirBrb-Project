import React from 'react';
import myFetch from '../components/fetcher';
import PropTypes from 'prop-types';
import LoggedInAppBar from '../components/LoggedInAppBar';
import GuestAppBar from '../components/GuestAppBar';
import { useNavigate } from 'react-router-dom';

RegisterScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function RegisterScreen ({ isLoggedIn, setLoggedIn }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');

  if (password !== confirmPassword) {
    console.log('Passwords dont match');
  }

  const moveTo = useNavigate();

  function RegisterForm (e) {
    const body = {
      email: e.email,
      password: e.password,
      name: e.name,
    }
    myFetch('POST', 'user/auth/register', null, body)
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', e.email);
        e.setLoggedIn(false)
        console.log('Successfully registered new user');
      })
      .catch((data) => {
        alert('Email already registered');
        console.log('Not successful in registering new user');
        e.setLoggedIn(false)
      })

    moveTo('../listings', { replace: true });
  }

  return (
    <div>
      {console.log('isLoggedin state is ' + isLoggedIn)}
      {isLoggedIn
        ? <>
            <LoggedInAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LoggedInAppBar>
          </>
        : <>
            <GuestAppBar></GuestAppBar>
            <h1>Register Form</h1>
            Email<input name="email" type="text" onChange={(e) => setEmail(e.target.value)} /><br/>
            Password<input name="password" type="text" onChange={(e) => setPassword(e.target.value)} /><br/>
            ConfirmPassword<input name="confirmPassword" type="text" onChange={(e) => setConfirmPassword(e.target.value)} /><br/>
            <div>{password !== confirmPassword ? "passswords don't match" : 'passwords match'}</div>
            Name<input name="name" type="text" onChange={(e) => setName(e.target.value)} /><br/>
            <button name="submitButton" onClick={() => RegisterForm({ email: email, password: password, confirmPassword: confirmPassword, name: name, loggedIn: isLoggedIn, setLoggedIn: setLoggedIn })}>Submit</button>
          </>
      }
    </div>
  );
}
