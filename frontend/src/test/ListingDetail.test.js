import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/'
import ListingDetail from '../components/ListingDetail';
import { Typography } from '@mui/material';

describe('ListingDetail', () => {
  it('check listing detail with no reviews', () => {
    const title = 'RandomTitle';
    const price = '0';
    const reviews = [];
    const wrapper = shallow(<ListingDetail title={title} price={price} reviews={reviews}/>);
    expect(wrapper.find(Typography).length).toBe(4)
    const Typographies = wrapper.find(Typography);
    expect(Typographies.at(0).text()).toBe('RandomTitle');
    expect(Typographies.at(1).text()).toBe('Rating: No Reviews');
    expect(Typographies.at(2).text()).toBe('Number of Reviews: 0');
    expect(Typographies.at(3).text()).toBe('Price: 0');
  })
  it('check listing detail with 1 review', () => {
    const title = 'RandomTitle';
    const price = '0';
    const reviews = [
      {
        text: 'Good stay',
        rating: 5
      }
    ];
    const wrapper = shallow(<ListingDetail title={title} price={price} reviews={reviews}/>);
    expect(wrapper.find(Typography).length).toBe(4)
    const Typographies = wrapper.find(Typography);
    expect(Typographies.at(0).text()).toBe('RandomTitle');
    expect(Typographies.at(1).text()).toBe('Rating: 5.0');
    expect(Typographies.at(2).text()).toBe('Number of Reviews: 1');
    expect(Typographies.at(3).text()).toBe('Price: 0');
  })
  it('check listing detail with more than 1 review', () => {
    const title = 'RandomTitle';
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
    const wrapper = shallow(<ListingDetail title={title} price={price} reviews={reviews}/>);
    expect(wrapper.find(Typography).length).toBe(4)
    const Typographies = wrapper.find(Typography);
    expect(Typographies.at(0).text()).toBe('RandomTitle');
    expect(Typographies.at(1).text()).toBe('Rating: 3.5');
    expect(Typographies.at(2).text()).toBe('Number of Reviews: 2');
    expect(Typographies.at(3).text()).toBe('Price: 0');
  })
})
