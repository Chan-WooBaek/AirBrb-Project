import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import ListingsScreen from './screens/ListingsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HostedListingsScreen from './screens/HostedListingsScreen';
import EditButton from './components/EditButton';

function App () {
  return (
    <>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/hostedListings">Hosted Listings</Link>

        <Routes>
          <Route path="/listings" element={<ListingsScreen/>}></Route>
          <Route path="/login" element={<LoginScreen/>}></Route>
          <Route path="/register" element={<RegisterScreen/>}></Route>
          <Route path ="/hostedListings" element={<HostedListingsScreen/>}></Route>
          {/* <Route path = "/hostedListings/354395729" element={<EditButton id={354395729}/>}></Route> */}
          <Route path = "/hostedListings/:id" element={<EditButton/>}></Route>
          <Route path ="/" element={<Navigate replace to="/listings"/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
