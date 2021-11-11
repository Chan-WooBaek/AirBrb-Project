import * as React from 'react';
import myFetch from '../components/fetcher';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const createListing = (prop) => {
  console.log(prop.title);
  const body = {
    title: prop.title,
    address: prop.address,
    price: prop.price,
    thumbnail: prop.thumbnail,
    metadata: prop.metadata
  }
  const token = localStorage.getItem('token');
  myFetch('POST', 'listings/new', token, body)
    .then((data) => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

const CreateListingForm = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState('');
  const [propType, setPropType] = React.useState('');
  const [amenities, setAmenities] = React.useState('');

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Listing
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Listing</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="thumbnail"
            label="Thumbnail"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="No. of bathrooms"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setBathrooms(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Property type"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setPropType(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Property amenities"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setAmenities(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => createListing({
            title: title,
            address: { address: address },
            price: price,
            thumbnail: thumbnail,
            metadata: { bathrooms: bathrooms, propType: propType, amenities: amenities }
          })}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateListingForm;
