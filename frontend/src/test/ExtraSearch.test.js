import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/';
import ExtraSearch from '../components/ExtraSearch';
import TextField from '@mui/material/TextField';

describe('ExtraSearch', () => {
  it('check extra search textfields are empty', () => {
    const noop = () => {}
    const setMinBedrooms = jest.fn();
    const setMaxBedrooms = jest.fn();
    const setMinPrice = jest.fn();
    const setMaxPrice = jest.fn();

    const wrapper = shallow(<ExtraSearch setMinBedrooms={ setMinBedrooms } setMaxBedrooms={ setMaxBedrooms } setMinPrice={ setMinPrice } setMaxPrice={ setMaxPrice } dateRange={ [] } setDateRange={ noop } lowRating={ false } setLowRating={ noop } highRating={false} setHighRating={ noop }/>);
    const textField = wrapper.find(TextField);
    expect(textField.length).toBe(4);
    expect(textField.at(0).props().id).toBe('minBedrooms');
    expect(textField.at(1).props().id).toBe('maxBedrooms');
    expect(textField.at(2).props().id).toBe('minPrice');
    expect(textField.at(3).props().id).toBe('maxPrice');
  })
  it('check extra search textfields can be changed', () => {
    const noop = () => {};
    const setMinBedrooms = jest.fn();
    const setMaxBedrooms = jest.fn();
    const setMinPrice = jest.fn();
    const setMaxPrice = jest.fn();
    const wrapper = shallow(<ExtraSearch setMinBedrooms={ setMinBedrooms } setMaxBedrooms={ setMaxBedrooms } setMinPrice={ setMinPrice } setMaxPrice={ setMaxPrice } dateRange={ [] } setDateRange={ noop } lowRating={ false } setLowRating={ noop } highRating={false} setHighRating={ noop }/>);
    const textField = wrapper.find(TextField);
    textField.at(0).simulate('change', { target: { value: '1' } })
    expect(setMinBedrooms).toHaveBeenCalledTimes(1);
    textField.at(1).simulate('change', { target: { value: '3' } })
    expect(setMaxBedrooms).toHaveBeenCalledTimes(1);
    textField.at(2).simulate('change', { target: { value: '1' } })
    expect(setMinPrice).toHaveBeenCalledTimes(1);
    textField.at(3).simulate('change', { target: { value: '100' } })
    expect(setMaxPrice).toHaveBeenCalledTimes(1);
  })
})
