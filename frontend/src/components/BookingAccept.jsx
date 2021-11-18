import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import myFetch from './fetcher';

export default function BookingAccept (bookingId) {
  async function acceptBooking () {
    const token = localStorage.getItem('token');
    const response = await myFetch('PUT', `bookings/accept/${bookingId.bookingId}`, token)
    console.log(response);
    window.location.reload();
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={acceptBooking} color="success">
        Accept
      </Button>
    </Stack>
  );
}
