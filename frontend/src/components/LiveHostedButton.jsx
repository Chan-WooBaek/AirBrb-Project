import React from 'react';
import myFetch from './fetcher';
const goingLive = (data) => {
  const token = localStorage.getItem('token');
  const responseBody = {
    availability: [
      {}
    ]
  }
  const listingId = data.id;
  myFetch('GET', 'listings/' + listingId, token)
    .then(data => {
      console.log(data.listing.published)
      data.listing.published
        ? myFetch('PUT', 'listings/unpublish/' + listingId, token, responseBody)
            .then(data => {
              console.log('published')
            })
        : myFetch('PUT', 'listings/publish/' + listingId, token, responseBody)
          .then(data => {
            console.log('unpublished')
          })
    })
}

const LiveHostedButton = (id) => {
  return (
    <button onClick={() => goingLive(id)}>GoLive</button>
  )
}

export default LiveHostedButton
