import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

ReviewsTableDetail.propTypes = {
  review: PropTypes.string,
  rating: PropTypes.number
}

export default function ReviewsTableDetail ({ review, rating }) {
  return (
    <Card sx={{ width: '100%', height: '10vh', display: 'inline-block' }}>
      <CardContent>
        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>
          {'Review: ' + review}
        </Typography>
        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>
          {'Rating: ' + rating}
        </Typography>
      </CardContent>
    </Card>
  );
}
