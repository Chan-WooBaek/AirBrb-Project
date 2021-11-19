import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import myFetch from '../components/fetcher';
import PropTypes from 'prop-types';

AvailabilityCalendar.propTypes = {
  id: PropTypes.number,
}

export default function AvailabilityCalendar ({ id }) {
  const [value, setValue] = React.useState([null, null]);
  const token = localStorage.getItem('token');

  function handleClick () {
    if (value[0] === null || value[1] === null) {
      alert('Please pick 2 dates');
      return;
    }
    myFetch('GET', 'listings/' + id, null)
      .then(data => {
        const availabilities = data.listing.availability
        availabilities.push({ start: value[0], end: value[1] })
        const responseBody = [
          { availability: availabilities },
          { published: data.listing.published },
        ]
        return responseBody
      })
      .then(responseBody => {
        console.log(responseBody[0].availability)
        if (responseBody[1].published) myFetch('PUT', 'listings/unpublish/' + id, token, null)
        myFetch('PUT', 'listings/publish/' + id, token, responseBody[0])
          .then(data => {
            console.log('success')
            alert('availability has been added!');
          })
      })
  }

  return (
    <>
      <Typography sx={{ fontSize: 20, textAlign: 'center' }} >Availability</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
          startText="Start"
          endText="End"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
          <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
          </React.Fragment>
          )}
      />
      </LocalizationProvider>
      <Button variant='outlined' style={{ alignItems: 'center' }} onClick={() => handleClick()} >Add Availability</Button>
    </>
  );
}
