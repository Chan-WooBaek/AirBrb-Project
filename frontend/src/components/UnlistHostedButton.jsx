import React from 'react';
import myFetch from './fetcher';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

LiveHostedButton.propTypes = {
  id: PropTypes.number,
}

export default function LiveHostedButton ({ id }) {
  const token = localStorage.getItem('token');

  const unlist = () => {
    const responseBody = {
      availability: []
    }
    myFetch('GET', 'listings/' + id, token)
      .then(data => {
        const availabilities = data.listing.availability
        console.log(availabilities)
        if (data.listing.published) {
          myFetch('PUT', 'listings/unpublish/' + id, token, responseBody)
            .then(data => {
              console.log('unpublished')
            })
        } else {
          alert('Listing is already unpublished')
        }
      })
  }
  return (
    <>
      <Button variant="outlined" onClick={() => unlist()}>Unlist</Button>
    </>
  )
}
