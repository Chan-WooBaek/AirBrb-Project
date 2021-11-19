import { TextField } from '@mui/material';
import { shallow } from 'enzyme';
import React from 'react';
import OurRating from '../components/Rating';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

describe('rating tests', () => {
  it('review has all expected components rendered', () => {
    const listingId = '1';
    const bookingId = 2;
    const rating = shallow(<OurRating listingId={listingId} bookingId={bookingId}/>);
    expect(rating.find(TextField).length).toBe(1);
    expect(rating.find(Typography).length).toBe(1);
    expect(rating.find(Rating).length).toBe(1);
  })
  it('valid review text field tests', () => {
    const listingId = '1';
    const bookingId = 2;
    const rating = shallow(<OurRating listingId={listingId} bookingId={bookingId}/>);
    const textDetails = rating.find(TextField)
    expect(textDetails.at(0).props().defaultValue).toBe('');
  })
  it('review has onChange effects where expected', () => {
    const listingId = '1';
    const bookingId = 2;
    const rating = shallow(<OurRating listingId={listingId} bookingId={bookingId}/>);
    const textDetails = rating.find(TextField);
    textDetails.simulate('change', { target: { value: 'RandomReview' } })
    const RatingValues = rating.find(Rating);
    RatingValues.simulate('change', { target: { value: 3 } })
  })
})
