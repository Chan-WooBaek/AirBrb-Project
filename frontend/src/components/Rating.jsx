import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import myFetch from './fetcher';
import PropTypes from 'prop-types';

BasicRating.propTypes = {
  listingId: PropTypes.string,
  bookingId: PropTypes.number
}

export default function BasicRating ({ listingId, bookingId }) {
  const [value, setValue] = React.useState(0);
  const [textValue, setTextValue] = React.useState('');

  const updateTextValue = (prop) => (event) => {
    setTextValue(event.target.value);
  }

  const handleClick = () => {
    const token = localStorage.getItem('token');
    const body = {
      review: {
        text: textValue,
        rating: value
      }
    }
    myFetch('PUT', `listings/${listingId}/review/${bookingId}`, token, body)
      .then(data => console.log(data))
  }

  return (
    <div>
      <p>Leave a review below:</p>
      <TextField
      id="textfield"
      label="Review"
      multiline
      rows={4}
      defaultValue=""
      onChange={updateTextValue('textfield')}
      sx={{ width: '50%' }}
      />
      <div sx={{ display: 'flex', }}>
        <Box
        sx={{
          '& > legend': { mt: 2 },
          flex: 1,
        }}
        >
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <Button onClick={handleClick} variant="outlined">Leave review</Button>
      </div>
    </div>
  );
}
