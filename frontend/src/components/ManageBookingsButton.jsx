import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const ManageBookingsButton = (id) => {
  const handleRowClick = useNavigate();

  const manageBookings = () => {
    handleRowClick('../bookings/' + id.id, { replace: true })
  }

  return (
    <Button variant="outlined" onClick={manageBookings}>Manage Bookings</Button>
  )
}

export default ManageBookingsButton
