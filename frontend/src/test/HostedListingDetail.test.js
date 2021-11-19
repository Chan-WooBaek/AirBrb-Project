import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/'
import HostedListingDetail from '../components/HostedListingDetail';
import { Typography } from '@mui/material';

describe('HostedListingDetail', () => {
  it('check hosted listing detail with no reviews', () => {
    const title = 'RandomTitle';
    const property = 'Apartment';
    const beds = '2';
    const bathrooms = '1';
    const price = '0';
    const reviews = [];
    const wrapper = shallow(<HostedListingDetail title={title} property={property} beds={beds} bathrooms={bathrooms} price={price} reviews={reviews}/>);
    expect(wrapper.find(Typography).length).toBe(6)
    const Typographies = wrapper.find(Typography);
    expect(Typographies.at(0).text()).toBe('RandomTitle');
    expect(Typographies.at(1).text()).toBe('Property type: Apartment');
    expect(Typographies.at(2).text()).toBe('Beds: 2Bathrooms: 1');
    expect(Typographies.at(3).text()).toBe('Rating: <HostedListingRating />');
    expect(Typographies.at(4).text()).toBe('Number of Reviews: 0');
    expect(Typographies.at(5).text()).toBe('Price: 0');
  })
  it('check hosted listing detail with 1 review', () => {
    const title = 'RandomTitle';
    const property = 'Apartment';
    const beds = '2';
    const bathrooms = '1';
    const price = '0';
    const reviews = [
      {
        text: 'Good stay',
        rating: 5
      }
    ];
    const wrapper = shallow(<HostedListingDetail title={title} property={property} beds={beds} bathrooms={bathrooms} price={price} reviews={reviews}/>);
    expect(wrapper.find(Typography).length).toBe(6)
    const Typographies = wrapper.find(Typography);
    expect(Typographies.at(0).text()).toBe('RandomTitle');
    expect(Typographies.at(1).text()).toBe('Property type: Apartment');
    expect(Typographies.at(2).text()).toBe('Beds: 2Bathrooms: 1');
    expect(Typographies.at(3).text()).toBe('Rating: <HostedListingRating />');
    expect(Typographies.at(4).text()).toBe('Number of Reviews: 1');
    expect(Typographies.at(5).text()).toBe('Price: 0');
  })
  it('check hosted listing detail with more than 1 review', () => {
    const title = 'RandomTitle';
    const property = 'Apartment';
    const beds = '2';
    const bathrooms = '1';
    const price = '0';
    const reviews = [
      {
        text: 'Good stay',
        rating: 5
      },
      {
        text: 'Bad stay',
        rating: 2
      }
    ];
    const wrapper = shallow(<HostedListingDetail title={title} property={property} beds={beds} bathrooms={bathrooms} price={price} reviews={reviews}/>);
    expect(wrapper.find(Typography).length).toBe(6)
    const Typographies = wrapper.find(Typography);
    expect(Typographies.at(0).text()).toBe('RandomTitle');
    expect(Typographies.at(1).text()).toBe('Property type: Apartment');
    expect(Typographies.at(2).text()).toBe('Beds: 2Bathrooms: 1');
    expect(Typographies.at(3).text()).toBe('Rating: <HostedListingRating />');
    expect(Typographies.at(4).text()).toBe('Number of Reviews: 2');
    expect(Typographies.at(5).text()).toBe('Price: 0');
  })
})
