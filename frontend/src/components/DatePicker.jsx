import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function MaterialUIPickers () {
  const [inValue, setInValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [outValue, setOutValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const checkInHandleChange = (newValue) => {
    setInValue(newValue);
  };

  const checkOutHandleChange = (newValue) => {
    setOutValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Check in date"
          inputFormat="MM/dd/yyyy"
          value={inValue}
          onChange={checkInHandleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="Check out date"
          inputFormat="MM/dd/yyyy"
          value={outValue}
          onChange={checkOutHandleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
