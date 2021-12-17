import * as React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { connect } from 'react-redux';
import { picData } from './picData';

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

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
