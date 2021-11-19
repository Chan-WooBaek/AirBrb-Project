import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import GuestMenu from '../components/GuestMenu';
import ExtraSearch from './ExtraSearch';

GuestAppBar.propTypes = {
  isListingDisplay: PropTypes.bool,
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
  minBedrooms: PropTypes.string,
  setMinBedrooms: PropTypes.func,
  maxBedrooms: PropTypes.string,
  setMaxBedrooms: PropTypes.func,
  minPrice: PropTypes.string,
  setMinPrice: PropTypes.func,
  maxPrice: PropTypes.string,
  setMaxPrice: PropTypes.func,
  dateRange: PropTypes.array,
  setDateRange: PropTypes.func,
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function GuestAppBar ({
  isListingDisplay,
  searchString, setSearchString,
  minBedrooms, setMinBedrooms,
  maxBedrooms, setMaxBedrooms,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  dateRange, setDateRange
}) {
  function handleChange (event) {
    setSearchString(event.target.value)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <GuestMenu></GuestMenu>
          {isListingDisplay === true
            ? <>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={() => handleChange(event)}
                  />
                  <ExtraSearch setMinBedrooms={setMinBedrooms}
                    setMaxBedrooms={setMaxBedrooms}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  >
                  </ExtraSearch>
                </Search>
              </>
            : <>
              </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
