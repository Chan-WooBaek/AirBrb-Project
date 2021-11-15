import * as React from 'react';
import myFetch from '../components/fetcher';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BedroomInput from '../components/BedroomInput';

const createListing = (prop) => {
  console.log(prop.title);
  if (prop.title === '' || prop.address === {} || prop.price === '' || prop.thumbnail === '' || prop.metadata === {}) {
    alert('Please fill in all blank spaces')
  }
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
    setBedrooms([''])
    setOpen(false);
  };

  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postcode, setPostcode] = React.useState(0);
  const [state, setState] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState(0);
  const [propType, setPropType] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  const [beds, setBeds] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState([''])

  const updateBedrooms = (index, newInput) => {
    const newBedrooms = [...bedrooms];
    newBedrooms[index] = newInput;
    setBedrooms(newBedrooms);
  }

  const addBedrooms = () => {
    const newBedrooms = [...bedrooms];
    newBedrooms.push('');
    setBedrooms(newBedrooms);
  }

  const getBedrooms = () => {
    const bedroomDic = {};
    let i = 1;
    for (const def in bedrooms) {
      bedroomDic['Bedroom ' + i] = bedrooms[def];
      i += 1
    }
    return bedroomDic;
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Listing
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Listing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all required fields to create new listing
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setStreet(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="state"
            label="State"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="postcode"
            label="Postcode"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setPostcode(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price (per night)"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="thumbnail"
            label="Thumbnail"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="bathrooms"
            label="No. of bathrooms"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setBathrooms(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="propType"
            label="Property type"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPropType(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="amenities"
            label="Property amenities"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setAmenities(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="beds"
            label="Total number of beds"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setBeds(e.target.value)}
          />
          {bedrooms.map((bedroom, idx) => {
            return <BedroomInput
              key={bedroom + idx}
              idx={idx}
              state={bedroom}
              setState={updateBedrooms}
            />
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={addBedrooms}>Add Bedroom</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => createListing({
            title: title,
            address: {
              street: street,
              city: city,
              state: state,
              postcode: postcode,
            },
            price: price,
            thumbnail: thumbnail,
            metadata: {
              bathrooms: bathrooms,
              beds: beds,
              bedrooms: getBedrooms(),
              propType: propType,
              amenities: amenities
            }
          })}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateListingForm;
