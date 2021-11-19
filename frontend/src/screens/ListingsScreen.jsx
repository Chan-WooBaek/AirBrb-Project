import React from 'react';
import ListingsDisplay from '../components/ListingsDisplay'
import PropTypes from 'prop-types';
import LoggedInAppBar from '../components/LoggedInAppBar';
import GuestAppBar from '../components/GuestAppBar';

ListingsScreen.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func,
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
}

export default function ListingsScreen ({ isLoggedIn, setLoggedIn }) {
  const [searchString, setSearchString] = React.useState('');
  const [minBedrooms, setMinBedrooms] = React.useState(null);
  const [maxBedrooms, setMaxBedrooms] = React.useState(null);
  const [minPrice, setMinPrice] = React.useState(null);
  const [maxPrice, setMaxPrice] = React.useState(null);
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [bookings, setBookings] = React.useState(null);
  const [lowRating, setLowRating] = React.useState(false);
  const [highRating, setHighRating] = React.useState(false);
  return (
    <div>
      {isLoggedIn
        ? <>
            <LoggedInAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}
              searchString={searchString} setSearchString={setSearchString}
              isListingDisplay={true}
              minBedrooms={minBedrooms} setMinBedrooms={setMinBedrooms}
              maxBedrooms={maxBedrooms} setMaxBedrooms={setMaxBedrooms}
              minPrice={minPrice} setMinPrice={setMinPrice}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              dateRange={dateRange} setDateRange={setDateRange}
              lowRating={lowRating} setLowRating={setLowRating}
              highRating={highRating} setHighRating={setHighRating}
            >
            </LoggedInAppBar>
          </>
        : <>
            <GuestAppBar searchString={searchString} setSearchString={setSearchString}
              isListingDisplay={true}
              minBedrooms={minBedrooms} setMinBedrooms={setMinBedrooms}
              maxBedrooms={maxBedrooms} setMaxBedrooms={setMaxBedrooms}
              minPrice={minPrice} setMinPrice={setMinPrice}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              dateRange={dateRange} setDateRange={setDateRange}
            >
            </GuestAppBar>
          </>
      }
      <ListingsDisplay isLoggedIn={isLoggedIn} searchString={searchString} setSearchString={setSearchString}
        minBedrooms={minBedrooms} maxBedrooms={maxBedrooms}
        minPrice={minPrice} maxPrice={maxPrice}
        dateRange={dateRange}
        bookings={bookings} setBookings={setBookings}
        lowRating={lowRating} highRating={highRating}
      />
    </div>
  );
}
