import React from 'react';
import { formatUSD } from './utils';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="400"
        image={`${props.product.imageUrl}`}
        alt={`${props.product.title}`}
      />
      <CardContent>
        <Typography>{props.product.title}</Typography>

        <Typography variant="body2">{props.product.author}</Typography>
        <Typography variant="body2">
          {props.product.minprice === props.product.maxprice
            ? formatUSD(props.product.maxprice)
            : `${formatUSD(props.product.minprice)} - ${formatUSD(
                props.product.maxprice
              )}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/products/${props.product.id}`}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{props.product.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
