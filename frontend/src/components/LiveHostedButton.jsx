import React from 'react';
const goingLive = (data) => {
  console.log('Livebutton pressed')
}

const LiveHostedButton = (id) => {
  return (
    <button onClick={() => goingLive(id)}>GoLive</button>
  )
}

export default LiveHostedButton
