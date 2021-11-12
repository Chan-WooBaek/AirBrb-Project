import React from 'react';
import myFetch from '../components/fetcher';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';

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
      window.location.reload();
      // (localStorage.getItem('token')) to get token
    })
    .catch((data) => {
      console.log('Not successful in logging in');
    })
}

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div>
      <h1>Login Form</h1>
      Email<input type="text" onChange={(e) => setEmail(e.target.value)} /><br/>
      Password<input type="text" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={() => LoginForm({ email: email, password: password })}>Submit</button>
      {localStorage.getItem('token') !== 'null'
        ? <>
            <LogoutButton></LogoutButton>
            <Link to="/">Listings</Link>
            <Link to="/hostedListings">MyListings</Link>
          </>
        : 'Not LoggedIn'
      }
    </div>
  );
}

export default LoginScreen;
