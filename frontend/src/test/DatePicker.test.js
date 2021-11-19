import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/';
import DatePicker from '../components/DatePicker';
import Button from '@mui/material/Button';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

describe('DatePicker', () => {
  it('check DatePicker Make booking button exists when logged in', () => {
    const isLoggedIn = true;
    const listingId = 12323123;
    const price = 1000;
    const wrapper = shallow(<DatePicker isLoggedIn={isLoggedIn} listingId={listingId} price={price} />)
    expect(wrapper.find(Button).length).toBe(1)
  })
  it('check DatePicker Make booking button does not exist when logged out', () => {
    const isLoggedIn = false;
    const listingId = 12323123;
    const price = 1000;
    const wrapper = shallow(<DatePicker isLoggedIn={isLoggedIn} listingId={listingId} price={price} />)
    expect(wrapper.find(Button).length).toBe(0)
  })
  it('check DatePicker has two DesktopDatePickers to input values into', () => {
    const isLoggedIn = false;
    const listingId = 12323123;
    const price = 1000;
    const wrapper = shallow(<DatePicker isLoggedIn={isLoggedIn} listingId={listingId} price={price} />)
    const datePickers = wrapper.find(DesktopDatePicker);
    expect(datePickers.length).toBe(2);
    datePickers.at(0).simulate('change', { target: { value: '11/13/2021' } })
    datePickers.at(1).simulate('change', { target: { value: '11/20/2021' } })
  })
})
