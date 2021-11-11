import React from 'react';
import myFetch from '../components/fetcher';

const RegisterForm = (e) => {
  console.log();
  const body = {
    email: e.email,
    password: e.password,
    name: e.name,
  }
  myFetch('POST', 'user/auth/register', null, body)
    .then((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', true);
      console.log('Successfully registered new user');
    })
    .catch((data) => {
      alert('Email already registered');
      console.log('Not successful in registering new user');
    })
}

const RegisterScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');

  if (password !== confirmPassword) {
    console.log('Passwords dont match');
  }

  return (
    <div>
      <h1>Register Form</h1>
      Email<input type="text" onChange={(e) => setEmail(e.target.value)} /><br/>
      Password<input type="text" onChange={(e) => setPassword(e.target.value)} /><br/>
      ConfirmPassword<input type="text" onChange={(e) => setConfirmPassword(e.target.value)} /><br/>
      <div>{password !== confirmPassword ? "passswords don't match" : 'passwords match'}</div>
      Name<input type="text" onChange={(e) => setName(e.target.value)} /><br/>
      <button onClick={() => RegisterForm({ email: email, password: password, confirmPassword: confirmPassword, name: name })}>Submit</button>
    </div>
  );
}

export default RegisterScreen;
