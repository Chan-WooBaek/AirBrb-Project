import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

SearchDateRange.propTypes = {
  dateRange: PropTypes.array,
  setDateRange: PropTypes.func,
}

export default function SearchDateRange ({ dateRange, setDateRange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      Date Range
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={dateRange}
        onChange={(newValue) => {
          setDateRange(newValue);
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
  );
}
