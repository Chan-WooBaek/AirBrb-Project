import * as React from 'react';
import { Box } from '@mui/system';
// import { useParams } from 'react-router';
import myFetch from '../components/fetcher';
import DatePicker from '../components/DatePicker';

const ViewListingSreen = (id) => {
  // const params = useParams();
  // const id = params.id;
  const [details, setDetails] = React.useState({
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
  });

  async function getListingDetails (listingId, setDetails) {
    const response = await myFetch('GET', `listings/${listingId}`, null);
    console.log(response.listing)
    setDetails(response.listing);
  }
  React.useEffect(() => {
    getListingDetails(id.id, setDetails);
  }, []);

  console.log(details)
  return (
    <div>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <h1>{details.title}</h1>
      </Box>
      <Box sx={{ display: 'inline-flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <img src={details.thumbnail}/>
      </Box>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <p>{details.address.street + ',' + details.address.city + ',' + details.address.state}</p>
      </Box>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <p>{'Price: $' + details.price + ' per night'}</p>
      </Box>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <p>{'Property type: ' + details.metadata.propType}</p>
      </Box>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <p>{'Number of beds: ' + details.metadata.beds}</p>
      </Box>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <p>{'Number of bathrooms: ' + details.metadata.bathrooms}</p>
      </Box>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        <p>{'Number of bedrooms: ' + Object.keys(details.metadata.bedrooms).length}</p>
      </Box>

      <DatePicker></DatePicker>
    </div>
  )
}

export default ViewListingSreen;
