import React from 'react';
import myFetch from './fetcher';
const deleting = (data) => {
  const token = localStorage.getItem('token');
  myFetch('DELETE', 'listings/' + data.id, token, null)
    .then(data => {
      console.log('successfully deleted!');
      window.location.reload()
    })
}

const DeleteHostedButton = (id) => {
  return (
    <button onClick={() => deleting(id)}>Delete</button>
  )
}

export default DeleteHostedButton
