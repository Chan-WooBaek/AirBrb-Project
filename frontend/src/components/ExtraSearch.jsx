import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import SearchDateRange from '../components/SearchDateRange';
import PropTypes from 'prop-types';

ExtraSearch.propTypes = {
  setMinBedrooms: PropTypes.func,
  setMaxBedrooms: PropTypes.func,
  setMinPrice: PropTypes.func,
  setMaxPrice: PropTypes.func,
  dateRange: PropTypes.array,
  setDateRange: PropTypes.func,
  lowRating: PropTypes.bool,
  setLowRating: PropTypes.func,
  highRating: PropTypes.bool,
  setHighRating: PropTypes.func,
}

export default function ExtraSearch ({ setMinBedrooms, setMaxBedrooms, setMinPrice, setMaxPrice, dateRange, setDateRange, lowRating, setLowRating, highRating, setHighRating }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMinBedrooms = (prop) => (event) => {
    setMinBedrooms(event.target.value)
  }

  const handleMaxBedrooms = (prop) => (event) => {
    setMaxBedrooms(event.target.value)
  }

  const handleMinPrice = (prop) => (event) => {
    setMinPrice(event.target.value)
  }

  const handleMaxPrice = (prop) => (event) => {
    setMaxPrice(event.target.value)
  }

  const handleLowRating = () => {
    console.log('low');
    const res = !lowRating
    setLowRating(res)
  }

  const handleHighRating = () => {
    console.log('high');
    setHighRating(!highRating)
  }

  return (
    <span>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <AddIcon></AddIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Additional Search Filters</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="minBedrooms"
            label="Min bedrooms"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleMinBedrooms('minBedrooms')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="maxBedrooms"
            label="Max bedrooms"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleMaxBedrooms('maxBedrooms')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="minPrice"
            label="Min Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleMinPrice('minPrice')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="maxPrice"
            label="Max Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleMaxPrice('maxPrice')}
          />
          <SearchDateRange dateRange={dateRange} setDateRange={setDateRange}></SearchDateRange>
          <Button onClick={() => { handleLowRating() }}>Lowest to Highest Reviews</Button>
          <Button onClick={() => { handleHighRating() }}>Highest to Lowest Reviews</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
