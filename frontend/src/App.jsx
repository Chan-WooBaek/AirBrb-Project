import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ListingsScreen from './screens/ListingsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HostedListingsScreen from './screens/HostedListingsScreen';
import EditButton from './components/EditButton';
import ViewListingScreen from './screens/ViewListingScreen';
import BookingRequestScreen from './screens/BookingRequestScreen';

function App () {
  const [isLoggedIn, setLoggedIn] = React.useState(localStorage.getItem('isLoggedIn') === 'true');
  const [searchString, setSearchString] = React.useState('');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/listings" element={<ListingsScreen isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} searchString={searchString} setSearchString={setSearchString}/>}></Route>
          <Route path="/login" element={<LoginScreen isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}></Route>
          <Route path="/register" element={<RegisterScreen isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}></Route>
          <Route path ="/hostedListings" element={<HostedListingsScreen isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}></Route>
          <Route path = "/hostedListings/:id" element={<EditButton/>}></Route>
          {/* <Route path = "/list/415204074" element={<ViewListingSreen id={415204074}/>}></Route> */}
          <Route path = "/listings/:id" element={<ViewListingScreen isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}></Route>
          <Route path ="/" element={<Navigate replace to="/listings"/>}></Route>
          <Route path = "/bookings/:id" element={<BookingRequestScreen isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
