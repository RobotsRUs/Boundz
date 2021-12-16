import React from 'react';
import { connect } from 'react-redux';
import {
  Badge,
  Chip,
  Divider,
  Backdrop,
  Button,
  Container,
  CircularProgress,
  Grid,
  TextField,
  Box,
  Typography,
  MenuItem,
  Stack,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
} from '@mui/material';
import { fetchProduct, clearProduct } from '../store';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { formatUSD } from './utils';
import ProductVariation from './ProductVariation';
import { unusedFormats } from './utils';
import axios from 'axios';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      summary: '',
      format: 'hardcover',
      ISBN13: '',
      imageUrl: '/images/book-cover.jpg',
      price: '',
      length: '',
      publisher: '',
      category: '',
      variations: [],
      imageFile: {},
      processing: false,
      displayDialog: false,
      existingCategories: [],
      existingPublishers: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleDeleteVariation = this.handleDeleteVariation.bind(this);
    this.handleAddVariation = this.handleAddVariation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showDialogue = this.showDialogue.bind(this);
  }

  async componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
    try {
      const { data: existingCategories } = await axios.get(
        '/api/products/categories'
      );
      this.setState({ existingCategories });
      const { data: existingPublishers } = await axios.get(
        '/api/products/publishers'
      );
      this.setState({ existingPublishers });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.book.id !== prevProps.book.id &&
      this.props.book.variations
    ) {
      const {
        title,
        author,
        description,
        summary,
        format,
        ISBN13,
        imageUrl,
        length,
        publisher,
        category,
        variations,
      } = this.props.book;
      const price = formatUSD(this.props.book.price).slice(1);
      for (let book of variations) {
        book.price = formatUSD(book.price).slice(1);
      }
      this.setState({
        title,
        author,
        description,
        summary,
        format,
        ISBN13,
        imageUrl,
        price,
        length,
        publisher,
        category,
        variations,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearProduct();
  }

  handleChange(evt) {
    let { name, value } = evt.target;
    let idx = null;

    // Check to see if field was related to a variant
    if (name.slice(0, 5) === 'price' && name.length > 5) {
      idx = name.slice(5);
      name = 'price';
    } else if (name.slice(0, 6) === 'format' && name.length > 6) {
      idx = name.slice(6);
      name = 'format';
    } else if (name.slice(0, 6) === 'ISBN13' && name.length > 6) {
      idx = name.slice(6);
      name = 'ISBN13';
    }

    // Update state for main product or variant
    if (idx === null) {
      this.setState({ [name]: value });
    } else {
      this.setState({
        variations: this.state.variations.map((variation, i) =>
          i === +idx ? { ...variation, [name]: value } : variation
        ),
      });
    }
  }

  handleDeleteVariation(idx) {
    this.setState({
      variations: this.state.variations.filter((variation, i) => i !== +idx),
    });
  }

  handleAddVariation(usedFormats) {
    this.setState({
      variations: [
        ...this.state.variations,
        { format: unusedFormats(usedFormats)[0], price: '', ISBN13: '' },
      ],
    });
  }

  handleImageSelect(evt) {
    if (evt.target.files[0]) {
      const imageUrl = URL.createObjectURL(evt.target.files[0]);
      this.setState({ imageUrl });
      this.setState({ imageFile: evt.target.files[0] });
    }
  }

  async handleSubmit(evt) {
    this.setState({ processing: true });
    evt.preventDefault();
    const product = JSON.parse(JSON.stringify(this.state));
    product.price = parseInt(+product.price * 100);
    for (let variation of product.variations) {
      variation.price = parseInt(+variation.price * 100);
      delete variation.id;
    }
    // MAKIN A MESS:
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const fd = new FormData();
    for (let key in product) {
      const val = Array.isArray(product[key])
        ? JSON.stringify(product[key])
        : product[key];
      fd.append(key, val);
    }
    // NEW:
    if (this.props.book.id) {
      const { data: updatedProduct } = await axios.put(
        `/api/products/${this.props.book.id}`,
        fd,
        config
      );
      this.props.history.push(`/products/${updatedProduct.id}`);
    } else {
      const { data: newProduct } = await axios.post(
        '/api/products',
        fd,
        config
      );
      this.props.history.push(`/products/${newProduct.id}`);
    }

    /* OLD:
    if (this.props.book.id) {
      await axios.put(`/api/products/${this.props.book.id}`, product, header);
    } else {
      await axios.post('/api/products', product, header);
    }*/
  }

  async handleDelete() {
    this.showDialogue(false);
    this.setState({ processing: true });
    await axios.delete(`/api/products/${this.props.book.id}`);
    this.props.history.push('/products');
  }

  showDialogue(visibility) {
    this.setState({ displayDialog: visibility });
  }

  render() {
    const {
      title,
      author,
      description,
      summary,
      format,
      ISBN13,
      imageUrl,
      price,
      length,
      publisher,
      category,
      variations,
    } = this.state;

    const usedFormats = [format, ...variations.map((book) => book.format)];

    return (
      <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.processing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <form onSubmit={this.handleSubmit} style={{ marginTop: '1rem' }}>
          <Stack spacing={2}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={1}>
                <Badge
                  sx={{ margin: 1 }}
                  color="primary"
                  badgeContent={
                    <label htmlFor="upload-image">
                      <input
                        accept="image/*"
                        // value={imageUrl}
                        name="imageUrl"
                        type="file"
                        onChange={this.handleImageSelect}
                        id="upload-image"
                        style={{ display: 'none' }}
                      />
                      <PhotoCamera />
                    </label>
                  }
                >
                  <img
                    className="cover-art"
                    src={imageUrl}
                    style={{ maxWidth: '100%' }}
                  />
                </Badge>
              </Grid>
              <Grid item xs sm>
                <Stack spacing={2}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    label="Title"
                    fullWidth
                  />
                  <TextField
                    required
                    id="author"
                    name="author"
                    value={author}
                    onChange={this.handleChange}
                    label="Author"
                    fullWidth
                  />

                  <TextField
                    required
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    label="Description"
                    fullWidth
                    multiline
                    minRows={2}
                  />
                </Stack>
              </Grid>
            </Grid>

            <TextField
              required
              id="summary"
              name="summary"
              value={summary}
              onChange={this.handleChange}
              label="Summary"
              fullWidth
              multiline
              minRows={6}
            />
            <Grid container>
              <Grid item xs>
                <TextField
                  required
                  id="length"
                  name="length"
                  value={length}
                  onChange={this.handleChange}
                  label="Length (pages)"
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      step: 1,
                    },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  freeSolo
                  value={publisher}
                  onChange={(evt, val) =>
                    this.handleChange({
                      target: { name: 'publisher', value: val || '' },
                    })
                  }
                  options={this.state.existingPublishers}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="publisher"
                      name="publisher"
                      onChange={this.handleChange}
                      label="Publisher"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  freeSolo
                  value={category}
                  onChange={(evt, val) =>
                    this.handleChange({
                      target: { name: 'category', value: val || '' },
                    })
                  }
                  options={this.state.existingCategories}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="category"
                      name="category"
                      onChange={this.handleChange}
                      label="Category"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Divider>
              <Chip label="Product Variations" />
            </Divider>
            {/* PRODUCT VARIATIONS: */}
            <ProductVariation
              handleChange={this.handleChange}
              format={format}
              usedFormats={usedFormats}
              price={price}
              ISBN13={ISBN13}
              handleAddVariation={this.handleAddVariation}
              addButtonEnabled={variations.length < 2}
            />
            {variations.map((variation, idx) => (
              <ProductVariation
                key={idx}
                id={idx}
                handleChange={this.handleChange}
                format={variation.format}
                usedFormats={usedFormats}
                price={variation.price}
                ISBN13={variation.ISBN13}
                handleDelete={(idx) => this.handleDeleteVariation(idx)}
              />
            ))}

            {/* END PRODUCT VARIATIONS */}
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              {this.props.book.id && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    this.showDialogue(true);
                  }}
                >
                  Delete
                </Button>
              )}
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
        {/* Confirm Delete Dialog */}
        <Dialog
          open={this.state.displayDialog}
          onClose={() => {
            this.showDialogue(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.showDialogue(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={this.handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapState = (state) => ({ book: state.singleProduct, auth: state.auth });

const mapDispatch = (dispatch) => ({
  fetchProduct: (productName) => dispatch(fetchProduct(productName)),
  clearProduct: () => dispatch(clearProduct()),
});

export default connect(mapState, mapDispatch)(ProductForm);
