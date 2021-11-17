import React from 'react';
import myFetch from './fetcher';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

LiveHostedButton.propTypes = {
  getState: PropTypes.bool,
  id: PropTypes.number,
}

export default function LiveHostedButton ({ id }) {
  const token = localStorage.getItem('token');
  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    myFetch('GET', 'listings/' + id, token)
      .then(data => {
        if (data.listing.published) setCheck(false)
        else setCheck(true)
      })
  })

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
          if (availabilities.length === 0) {
            alert('Please pick at least one date before going live');
          } else {
            myFetch('PUT', 'listings/publish/' + id, token, responseBody)
              .then(data => {
                console.log('published')
              })
          }
        }
        window.location.reload()
      })
  }
  return (
    <>
      <Button disabled={check} variant="outlined" onClick={() => unlist()}>Unlist</Button>
    </>
  )
}
