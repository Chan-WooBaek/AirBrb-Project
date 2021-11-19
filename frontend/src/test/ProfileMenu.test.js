import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/';
import ProfileMenu from '../components/ProfileMenu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

describe('ProfileMenu', () => {
  it('renders all expected elements', () => {
    const wrapper = shallow(<ProfileMenu/>);
    expect(wrapper.find(IconButton).length).toBe(1);
    expect(wrapper.find(Menu).length).toBe(1);
    expect(wrapper.find(MenuItem).length).toBe(3);
  })
})
