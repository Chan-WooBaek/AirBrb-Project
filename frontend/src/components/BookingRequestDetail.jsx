import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

BookingRequestDetail.propTypes = {
  owner: PropTypes.string,
  dateRange: PropTypes.object,
  status: PropTypes.string,
}

export default function BookingRequestDetail ({ owner, dateRange, status }) {
  const getFromDate = () => {
    const date = new Date(dateRange.start);
    return date.toDateString();
  }
  const getToDate = () => {
    const date = new Date(dateRange.end);
    return date.toDateString();
  }

  return (
    <Card sx={{ width: '100%', height: '10vh', display: 'inline-block' }}>
      <CardContent>
        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>
          {'Owner: ' + owner}
        </Typography>
        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>
          {'From: ' + getFromDate()}
        </Typography>
        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>
          {'To: ' + getToDate()}
        </Typography>
        <Typography sx={{ fontSize: 12, textAlign: 'center' }} gutterBottom>
          {'Status: ' + status}
        </Typography>
      </CardContent>
    </Card>
  );
}
