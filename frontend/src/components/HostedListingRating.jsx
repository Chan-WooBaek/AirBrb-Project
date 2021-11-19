import * as React from 'react';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';

HostedListingRating.propTypes = {
  value: PropTypes.number,
}

export default function HostedListingRating ({ value }) {
  return (
    <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />
  );
}
