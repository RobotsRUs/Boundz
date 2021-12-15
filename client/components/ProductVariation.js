import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { unusedFormats } from './utils';

const ProductVariation = ({
  handleChange,
  format,
  usedFormats,
  price,
  id = '',
  handleDelete,
  ISBN13,
}) => (
  <>
    <FormControl>
      <InputLabel id={`format-select${id}`}>Format</InputLabel>

      <Select
        id={`format${id}`}
        name={`format${id}`}
        value={format}
        labelId={`format-select${id}`}
        label="format"
        onChange={handleChange}
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
    <TextField
      required
      id={`price${id}`}
      name={`price${id}`}
      value={price}
      onChange={handleChange}
      label="Price"
    />
    <TextField
      required
      id={`ISBN13${id}`}
      name={`ISBN13${id}`}
      value={ISBN13}
      onChange={handleChange}
      label="ISBN-13"
    />
    {id !== '' && (
      <IconButton onClick={() => handleDelete(id)}>
        <DeleteIcon />
      </IconButton>
    )}
  </>
);

export default ProductVariation;
