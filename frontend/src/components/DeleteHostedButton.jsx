import React from 'react';
import myFetch from './fetcher';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteHostedButton = (id) => {
  const deleting = (data) => {
    const token = localStorage.getItem('token');
    myFetch('DELETE', 'listings/' + data.id, token, null)
      .then(data => {
        console.log('successfully deleted!');
        alert('Listing has been deleted')
      })
      .catch(data => {
        alert('Already deleted listing')
      })
  }
  return (
    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleting(id)}>Delete Listing</Button>
  )
}

export default DeleteHostedButton
