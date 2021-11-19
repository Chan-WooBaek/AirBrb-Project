/* eslint-disable */
import { TextField } from '@mui/material';
import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import Rating from '../components/Rating';
// import Card from '@mui/material/Card';

describe('rating tests', () => {
  it('valid review text field tests', () => {
    const listingId = '1';
    const bookingId = 2; 
    const rating = shallow(<Rating listingId={listingId} bookingId={bookingId}/>)
    const textDetails = rating.find(TextField)
    expect(textDetails.at(0).props()['defaultValue']).toBe('');
  })
})