import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Container,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { unusedFormats } from './utils';

const ProductVariation = ({
  addButtonEnabled,
  handleChange,
  format,
  usedFormats,
  price,
  id = '',
  handleDelete,
  ISBN13,
  handleAddVariation,
}) => (
  <Grid container>
    <Grid item xs>
      <FormControl fullWidth>
        <InputLabel id={`format-select${id}`}>Format</InputLabel>
        <Select
          id={`format${id}`}
          name={`format${id}`}
          value={format}
          labelId={`format-select${id}`}
          label="format"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem key={format} value={format}>
            {format}
          </MenuItem>
          {unusedFormats(usedFormats).map((format) => (
            <MenuItem key={format} value={format}>
              {format}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs>
      <TextField
        required
        id={`price${id}`}
        name={`price${id}`}
        value={price}
        onChange={handleChange}
        label="Price"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          inputProps: {
            min: 0,
            step: 0.01,
          },
        }}
        fullWidth
      />
    </Grid>
    <Grid item xs>
      <TextField
        required
        id={`ISBN13${id}`}
        name={`ISBN13${id}`}
        value={ISBN13}
        onChange={handleChange}
        label="ISBN-13"
        fullWidth
      />
    </Grid>
    <Grid item>
      {id !== '' ? (
        <IconButton color="error" onClick={() => handleDelete(id)}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton
          color="success"
          disabled={!addButtonEnabled}
          onClick={() => handleAddVariation(usedFormats)}
        >
          <AddCircleIcon />
        </IconButton>
      )}
    </Grid>
  </Grid>
);

export default ProductVariation;
