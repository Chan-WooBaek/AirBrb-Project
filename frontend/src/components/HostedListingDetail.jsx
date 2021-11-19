import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import HostedListingRating from '../components/HostedListingRating';

HostedListingDetails.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  bedrooms: PropTypes.string,
  bathrooms: PropTypes.string,
  reviews: PropTypes.array,
  price: PropTypes.string,
}

export default function HostedListingDetails ({ title, property, bedrooms, bathrooms, reviews, price }) {
  function getRating () {
    let totalRating = 0;
    for (const review in reviews) {
      totalRating += reviews[review].rating;
    }
    const avgRating = (totalRating / reviews.length);
    if (isNaN(avgRating)) return 'No Reviews';
    else return avgRating.toFixed(1);
  }
  return (
    <Card sx={{ width: '50%', height: '30vh', display: 'inline-block' }}>
      <CardContent>
        <Typography sx={{ fontSize: '2.7vw', textAlign: 'center' }} gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '2.5vw', textAlign: 'center' }}>
          {'Property type: ' + property}
        </Typography>
        <Typography sx={{ fontSize: '2.5vw', textAlign: 'center' }}>
          {'Bedrooms: ' + bedrooms}
          <br />
          {'Bathrooms: ' + bathrooms}
        </Typography>
        <Typography sx={{ fontSize: '2.5vw', textAlign: 'center' }}>
          {'Rating: '}<HostedListingRating value={getRating()}></HostedListingRating>
        </Typography>
        <Typography sx={{ fontSize: '2.5vw', textAlign: 'center' }}>
          {'Number of Reviews: ' + reviews.length}
        </Typography>
        <Typography sx={{ fontSize: '2.5vw', textAlign: 'center' }}>
          {'Price: ' + price}
        </Typography>
      </CardContent>
    </Card>
  );
}
