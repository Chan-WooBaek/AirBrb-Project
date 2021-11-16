import React from 'react';
import myFetch from './fetcher';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

LiveHostedButton.propTypes = {
  getState: PropTypes.bool,
  id: PropTypes.number,
}

export default function LiveHostedButton ({ id }) {
  const token = localStorage.getItem('token');
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    myFetch('GET', 'listings/' + id, token)
      .then(data => {
        data.listing.published ? setChecked(true) : setChecked(false)
      })
  }, [])

  const goingLive = () => {
    const responseBody = {
      availability: [
        {}
      ]
    }
    myFetch('GET', 'listings/' + id, token)
      .then(data => {
        if (data.listing.published) setChecked(false)
        else setChecked(true)
        data.listing.published
          ? myFetch('PUT', 'listings/unpublish/' + id, token, responseBody)
              .then(data => {
                console.log('unpublished')
              })
          : myFetch('PUT', 'listings/publish/' + id, token, responseBody)
            .then(data => {
              console.log('published')
            })
      })
  }
  return (
    <>
      <Switch checked={checked} inputProps={{ 'aria-label': 'controlled' }} onChange={() => goingLive()}></Switch> Live
    </>
  )
}
