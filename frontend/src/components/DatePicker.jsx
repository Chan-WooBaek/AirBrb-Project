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
  const [availabilities, setAvailabilities] = React.useState([]);
  // const [dateIsAvailable, setDateIsAvailable] = React.useState(false);
  async function updateAvailabilities (availabilities) {
    const response = await myFetch('GET', `listings/${listingId}`, null);
    setAvailabilities(response.listing.availability)
  }
  React.useEffect(() => {
    updateAvailabilities(availabilities)
  }, []);

  const checkInHandleChange = (newValue) => {
    setInValue(newValue);
  };

  const checkOutHandleChange = (newValue) => {
    setOutValue(newValue);
  };

  const checkValidDates = (inValue, outValue) => {
    if (inValue >= outValue) {
      return false;
    }
    return true;
  }

  const getBookingDays = () => {
    console.log(outValue);
    console.log(inValue);
    const isoOut = new Date(outValue);
    const isoIn = new Date(inValue);
    return Math.floor((Math.abs(isoOut - isoIn)) / (1000 * 60 * 60 * 24));
  }

  const makeBooking = () => {
    if (!checkValidDates(inValue, outValue)) {
      alert('Please enter valid dates');
      return
    }
    const body = {
      dateRange: {
        start: inValue,
        end: outValue
      },
      totalPrice: price * getBookingDays()
    }
    let dateisAvailable = false;
    for (const dates in availabilities) {
      if (Object.keys(availabilities[dates]).length !== 0) {
        const start = availabilities[dates].start
        const end = availabilities[dates].end
        const bookingStart = new Date(inValue);
        const bookingEnd = new Date(outValue);
        if (checkIfDateIsWithinRange(start, end, bookingStart.toISOString()) && checkIfDateIsWithinRange(start, end, bookingEnd.toISOString())) {
          dateisAvailable = true;
          break
        }
      }
    }
    if (dateisAvailable) {
      const token = localStorage.getItem('token');
      myFetch('POST', `bookings/new/${listingId}`, token, body)
        .then(data => {
          console.log(data)
          alert('Booking has been made');
        })
        .catch(err => {
          alert(err)
        })
    } else {
      alert('Date is not available for booking')
    }
  }

  const checkIfDateIsWithinRange = (startDate, endDate, date) => {
    if (startDate.localeCompare(date) <= 0 && endDate.localeCompare(date) >= 0) {
      return true;
    } else {
      return false;
    }
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
