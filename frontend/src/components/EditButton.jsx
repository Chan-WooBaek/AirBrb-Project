import * as React from 'react';
import myFetch from './fetcher';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BedroomInput from './BedroomInput';
// import getListingDetails from '../utils/helpers';
// import { StoreContext } from '../utils/store';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

const editListing = (prop) => {
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
  myFetch('PUT', 'listings/' + prop.id, token, body)
    .then((data) => {
      // handleClose();
    })
    .catch(err => console.log(err))
}

const EditButton = () => {
  const params = useParams();
  const id = params.id;
  const [open, setOpen] = React.useState(true);
  const handleEditClick = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
    handleEditClick(`../hostedListings/${id}`, { replace: true })
  };

  const handleClose = () => {
    setOpen(false);
    handleEditClick('../hostedListings', { replace: true })
  };

  const [listingDetails, setListingDetails] = React.useState({
    title: '',
    owner: '',
    address: {
      street: '',
      city: '',
      state: '',
      postcode: '',
    },
    price: 0,
    thumbnail: '',
    metadata: {
      bathrooms: '',
      beds: '',
      bedrooms: {},
      propType: '',
      amenities: ''
    },
    reviews: [
      {}
    ],
    availability: [
      {}
    ],
    published: false,
    postedOn: ''
  })
  const [bedrooms, setBedrooms] = React.useState(['']);

  const handleChange = (prop) => (event) => {
    setListingDetails({ ...listingDetails, [prop]: event.target.value })
  }

  const handleAddressChange = (prop) => (event) => {
    const address = listingDetails.address;
    address[prop] = event.target.value;
    setListingDetails({ ...listingDetails, address: address });
  }

  const handleMetadataChange = (prop) => (event) => {
    const metadata = listingDetails.metadata;
    metadata[prop] = event.target.value;
    setListingDetails({ ...listingDetails, metadata: metadata });
  }

  const getBedroomsList = (details) => {
    const bedrooms = [];
    const bedroomsDict = details.metadata.bedrooms;
    for (const bed in bedroomsDict) {
      bedrooms.push(bedroomsDict[bed]);
    }
    console.log(details);
    return bedrooms;
  }

  async function updateListingDetails (listingId, setListingDetails) {
    const response = await myFetch('GET', `listings/${listingId}`, null);
    console.log(response.listing)
    setListingDetails(response.listing);
    setBedrooms(getBedroomsList(response.listing));
  }

  React.useEffect(() => {
    updateListingDetails(id, setListingDetails);
  }, []);

  // React.useEffect(() => {
  //   setBedrooms(getBedroomsList);
  // }, []);

  const updateBedrooms = (index, newInput) => {
    const newBedrooms = [...bedrooms];
    newBedrooms[index] = newInput;
    setBedrooms(newBedrooms);
  }

  const getBedroomsDict = () => {
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
        Edit Listing
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Listing</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          {console.log(listingDetails)}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            value={listingDetails.title}
            fullWidth
            variant="standard"
            onChange={handleChange('title')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street"
            type="text"
            value={listingDetails.address.street}
            fullWidth
            variant="standard"
            onChange={handleAddressChange('street')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            value={listingDetails.address.city}
            variant="standard"
            onChange={handleAddressChange('city')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="state"
            label="State"
            type="text"
            fullWidth
            variant="standard"
            value={listingDetails.address.state}
            onChange={handleAddressChange('state')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="postcode"
            label="Postcode"
            type="number"
            fullWidth
            variant="standard"
            value={listingDetails.address.postcode}
            onChange={handleAddressChange('postcode')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price (per night)"
            type="number"
            fullWidth
            variant="standard"
            value={listingDetails.price}
            onChange={handleChange('price')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="thumbnail"
            label="Thumbnail"
            type="text"
            fullWidth
            variant="standard"
            value={listingDetails.thumbnail}
            onChange={handleChange('thumbnail')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="bathrooms"
            label="No. of bathrooms"
            type="number"
            fullWidth
            variant="standard"
            value={listingDetails.metadata.bathrooms}
            onChange={handleMetadataChange('bathrooms')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="propType"
            label="Property type"
            type="text"
            fullWidth
            variant="standard"
            value={listingDetails.metadata.propType}
            onChange={handleMetadataChange('propType')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="amenities"
            label="Property amenities"
            type="text"
            fullWidth
            variant="standard"
            value={listingDetails.metadata.amenities}
            onChange={handleMetadataChange('amenities')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="beds"
            label="No. of beds"
            type="number"
            fullWidth
            variant="standard"
            value={listingDetails.metadata.beds}
            onChange={handleMetadataChange('beds')}
          />
          {/* {console.log('bedrooms: ')}
          {console.log(bedrooms)} */}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => editListing({
            id: id,
            title: listingDetails.title,
            address: {
              street: listingDetails.address.street,
              city: listingDetails.address.city,
              state: listingDetails.address.state,
              postcode: listingDetails.address.postcode,
            },
            price: listingDetails.price,
            thumbnail: listingDetails.thumbnail,
            metadata: {
              bathrooms: listingDetails.metadata.bathrooms,
              beds: listingDetails.metadata.beds,
              bedrooms: getBedroomsDict(),
              propType: listingDetails.metadata.propType,
              amenities: listingDetails.metadata.amenities
            }
          })}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditButton;
