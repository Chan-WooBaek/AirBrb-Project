/* eslint-disable */
import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import BookingRequestDetail from '../components/BookingRequestDetail';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

describe('Booking request cards', () => {
  it('card valid details', () => {
    const owner = 'Custom Owner';
    const dateRange = {
      start: 'Sat Jan 02 2021 21:11:54 GMT+1100 (Australian Eastern Daylight Time)',
      end: 'Fri Jan 01 2021 21:11:54 GMT+1100 (Australian Eastern Daylight Time)'
    };
    const status = 'pending'
    const card = shallow(<BookingRequestDetail owner={owner} dateRange={dateRange} status={status}/>)
    const details = card.find(Typography);
    // should exist 4 typographys
    expect(details.length).toBe(4);
    // testing all text fields
    expect(details.at(0).text()).toBe('Owner: Custom Owner');
    expect(details.at(1).text()).toBe('From: Sat Jan 02 2021');
    expect(details.at(2).text()).toBe('To: Fri Jan 01 2021');
    expect(details.at(3).text()).toBe('Status: pending');
  })

  it('card invalid date details', () => {
    const owner = 'Custom Owner';
    const dateRange = {
    };
    const status = 'pending'
    const card = shallow(<BookingRequestDetail owner={owner} dateRange={dateRange} status={status}/>)
    const details = card.find(Typography);
    expect(details.at(0).text()).toBe('Owner: Custom Owner');
    expect(details.at(1).text()).toBe('From: Invalid Date');
    expect(details.at(2).text()).toBe('To: Invalid Date');
    expect(details.at(3).text()).toBe('Status: pending');
  })

  // it('card given no props', () => {
  //   const card = shallow(<BookingRequestDetail/>)
  //   expect(card).toBeUndefined();
  // })
})
