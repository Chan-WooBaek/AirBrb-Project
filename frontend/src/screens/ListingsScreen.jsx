import React from 'react';
import LogoutButton from '../components/logoutButton';

const ListingsScreen = () => {
  if (localStorage.getItem('token') !== 'null') {
    return (
      <div>
        ListingsScreen
        <LogoutButton></LogoutButton>
      </div>
    );
  } else {
    return (
      <div>
        ListingsScreen
      </div>
    );
  }
}

export default ListingsScreen;
