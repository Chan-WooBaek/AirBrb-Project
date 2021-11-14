import * as React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const BedroomInput = ({ idx, state, setState }) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="bedroom"
      label={'Bedroom ' + (idx + 1) + ' bed types'}
      type="text"
      fullWidth
      variant="standard"
      value={state}
      onChange={(e) => setState(idx, e.target.value)}
    />
  )
}

BedroomInput.propTypes = {
  idx: PropTypes.number,
  state: PropTypes.string,
  setState: PropTypes.func,
}

export default BedroomInput;
