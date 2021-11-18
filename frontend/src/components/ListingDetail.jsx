import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

ListingDetails.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  bedrooms: PropTypes.object,
  bathrooms: PropTypes.string,
  reviews: PropTypes.array,
  price: PropTypes.string,
}

export default function ListingDetails ({ title, property, bedrooms, bathrooms, reviews, price }) {
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
    <Card sx={{ width: '50%', height: '50vh', display: 'inline-block' }}>
      <CardContent>
        <Typography sx={{ fontSize: 50, textAlign: 'center' }} gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 50, textAlign: 'center' }}>
          {'Rating: ' + getRating()}
        </Typography>
        <Typography sx={{ fontSize: 50, textAlign: 'center' }}>
          {'Number of Reviews: ' + reviews.length}
        </Typography>
        <Typography sx={{ fontSize: 50, textAlign: 'center' }}>
          {'Price: ' + price}
        </Typography>
      </CardContent>
    </Card>
  );
}
