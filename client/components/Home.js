import * as React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { connect } from 'react-redux';

export class Home extends React.Component {
  render() {
    const { username } = this.props;

    return (
      <div>
        <div>
          <h1>
            WELCOME👐BIENVENIDO👐BIENVENUE👐ДОБРО
            ПОЖАЛОВАТЬ👐أهلابك👐BIENVENI👐환영하다👐WELKOM👐ようこそ👐ברוך הבא
          </h1>
          <h1>{username}</h1>
          <h1>to the Boundz</h1>
          <h1>
            FAMILY👐FAMILIA👐FAMILLE👐СЕМЬЯ👐أسرة👐FANMI👐가족👐FAMILIE👐家族👐מִשׁפָּחָה
          </h1>
        </div>
        <ImageList
          sx={{ width: 1800, height: 1100 }}
          variant="woven"
          cols={6}
          gap={100}
        >
          {picData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=161&fit=crop&auto=format`}
                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

const picData = [
  {
    img: 'https://images.unsplash.com/photo-1548048026-5a1a941d93d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2tzdG9yZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'TheWife',
  },
  {
    img: 'https://images.unsplash.com/photo-1639588337531-bc83508a0abf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'LatteArt',
  },
  {
    img: 'https://images.unsplash.com/photo-1509266272358-7701da638078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80',
    title: 'BookTrail',
  },
  {
    img: 'https://images.unsplash.com/photo-1572097560317-1189048dac38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJvb2tzdG9yZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'BigLibrary',
  },
  {
    img: 'https://images.unsplash.com/photo-1525715843408-5c6ec44503b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    title: 'BlackHatReading',
  },
  {
    img: 'https://images.unsplash.com/photo-1524420775504-d6dbb9f9819b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHJlYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: 'TwoLadies',
  },
  {
    img: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVhZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'FluffyPuppy',
  },
  {
    img: 'https://images.unsplash.com/photo-1515541965486-309946b5572b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: 'ManProfile',
  },
  {
    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: 'CurvedLibrary',
  },
  {
    img: 'https://images.unsplash.com/photo-1639624949507-383c68ad4fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'LoveYours',
  },
  {
    img: 'https://images.unsplash.com/photo-1639562954924-975ca13f454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60 ',
    title: 'LovePeaceGift',
  },
  {
    img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzdG9yZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'FloatingBook',
  },
  {
    img: 'https://images.unsplash.com/photo-1555116505-38ab61800975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxpYnJhcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: 'BookshelfWithChair',
  },
  {
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: '1stEditions',
  },
  {
    img: 'https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bGlicmFyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'WhiteStaircaseLibrary',
  },
  {
    img: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bGlicmFyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    title: 'ReverseCurveLibrary',
  },
  {
    img: 'https://images.unsplash.com/photo-1573592371950-348a8f1d9f38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3N0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    title: 'AntiqueBookstore',
  },
  {
    img: 'https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxpYnJhcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    title: 'WhiteBookshelves',
  },
];

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
