import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import myFetch from './fetcher';

export default function BookingDecline (bookingId) {
  async function declineBooking () {
    const token = localStorage.getItem('token');
    const response = await myFetch('PUT', `bookings/decline/${bookingId.bookingId}`, token);
    console.log(response);
    window.location.reload();
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={declineBooking} color="error">
        Decline
      </Button>
    </Stack>
  );
}
