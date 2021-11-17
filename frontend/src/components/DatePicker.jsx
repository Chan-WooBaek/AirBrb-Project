import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import myFetch from './fetcher';

DatePicker.propTypes = {
  isLoggedIn: PropTypes.bool,
  listingId: PropTypes.string,
  price: PropTypes.number
}

export default function DatePicker ({ isLoggedIn, listingId, price }) {
  const [inValue, setInValue] = React.useState(new Date('2021-01-01T21:11:54'));
  const [outValue, setOutValue] = React.useState(new Date('2021-01-02T21:11:54'));
  // const [bookingSuccess, setBookingSuccess] = React.useState(2);

  const checkInHandleChange = (newValue) => {
    if (checkValidInDate(newValue)) {
      setInValue(newValue);
    }
  };

  const checkOutHandleChange = (newValue) => {
    if (checkValidOutDate(newValue)) {
      setOutValue(newValue);
    }
  };

  const checkValidInDate = (newValue) => {
    if (newValue >= outValue) {
      alert('Please enter valid dates');
      return false;
    }
    return true;
  }

  const checkValidOutDate = (newValue) => {
    if (newValue <= inValue) {
      alert('Please enter valid dates');
      return false;
    }
    return true;
  }

  const getBookingDays = () => {
    Math.floor((Date.parse(outValue) - Date.parse(inValue)) / 86400000)
  }

  const makeBooking = () => {
    const body = {
      dateRange: {
        start: inValue,
        end: outValue
      },
      totalPrice: price * getBookingDays()
    }
    const token = localStorage.getItem('token');
    myFetch('POST', `bookings/new/${listingId}`, token, body)
      .then(data => {
      })
      .catch(err => {
        alert(err)
      })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Check in date"
          inputFormat="MM/dd/yyyy"
          value={inValue}
          onChange={checkInHandleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="Check out date"
          inputFormat="MM/dd/yyyy"
          value={outValue}
          onChange={checkOutHandleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        {isLoggedIn
          ? <Button variant="contained" onClick={makeBooking}>Make booking</Button>
          : <p>Please log in to make a booking</p>
        }
        {/* {bookingSuccess == 1
          ? <p>Successfully booked!</p>
          : <p>Booking not successful</p>
        } */}
      </Stack>
    </LocalizationProvider>
  );
}
