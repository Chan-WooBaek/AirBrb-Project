import React from 'react';
import CreateListingForm from '../screens/CreateListingScreen';
// import EditButton from '../components/EditButton';
import LogoutButton from '../components/logoutButton';
import { Link } from 'react-router-dom';
import HostedListingsDisplay from '../components/HostedListingsDisplay';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

HostedListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}

export default function HostedListingsScreen ({ isLoggedIn, setLoggedIn }) {
  const [display, setDisplay] = React.useState(false);
  function handleDropDown () {
    if (display) {
      setDisplay(false)
    } else {
      setDisplay(true)
    }
  }
  return (
    <div>
      HostedListingsScreen
      {/* <EditButton id={202301096}></EditButton> */}
      {isLoggedIn
        ? <>
            <LogoutButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></LogoutButton>
            <Link to="/">Listings</Link>
            <Link to="/hostedListings">MyListings</Link>
            <CreateListingForm></CreateListingForm>
            <HostedListingsDisplay></HostedListingsDisplay>
            <AccountCircleIcon onClick={() => handleDropDown()}></AccountCircleIcon>
            {display
              ? <>
                  <div>Hello</div>
                </>
              : <></>
            }
          </>
        : <>
            {'Not LoggedIn'}
          </>
      }
    </div>
  );
}
