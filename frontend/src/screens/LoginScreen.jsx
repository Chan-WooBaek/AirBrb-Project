import React from 'react';
import myFetch from '../components/fetcher';

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
      // (localStorage.getItem('token')) to get token
    })
    .catch((data) => {
      alert('email or password does not match');
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
    </div>
  );
}

export default LoginScreen;
