import React from 'react';
import LogoutButton from '../components/logoutButton';

const ListingsScreen = () => {
  return (
    <div>
      ListingsScreen <br />
      {localStorage.getItem('token') !== 'null'
        ? <LogoutButton></LogoutButton>
        : 'Not LoggedIn'
      }
    </div>
  );
}

export default ListingsScreen;
