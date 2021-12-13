import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SingleProduct from '../../client/components/SingleProduct';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

const adapter = new Adapter();
enzyme.configure({ adapter });

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

const book = {
  id: 1,
  title: 'The Man in the High Castle',
  author: 'Philip K. Dick',
  description:
    'The Man in the High Castle is Dick at his best, giving readers a harrowing vision of the world that almost was. “The single most resonant and carefully imagined book of Dick’s career.” —New York Times',
  summary:
    "In this Hugo Award–winning alternative history classic—the basis for the Amazon Original series—the United States lost World War II and was subsequently divided between the Germans in the East and the Japanese in the West. It’s America in 1962. Slavery is legal once again. The few Jews who still survive hide under assumed names. In this world, we meet characters like Frank Frink, a dealer of counterfeit Americana who is himself hiding his Jewish ancestry; Nobusuke Tagomi, the Japanese trade minister in San Francisco, unsure of his standing within the bureaucracy and Japan's with Germany; and Juliana Frink, Frank's ex-wife, who may be more important than she realizes. These seemingly disparate characters gradually realize their connections to each other just as they realize that something is not quite right about their world. And it seems as though the answers might lie with Hawthorne Abendsen, a mysterious and reclusive author, whose best-selling novel describes a world in which the US won the War... The Man in the High Castle is Dick at his best, giving readers a harrowing vision of the world that almost was. “The single most resonant and carefully imagined book of Dick’s career.” —New York Times",
  format: 'hardcover',
  ISBN13: '9780547601205',
  imageUrl:
    'http://books.google.com/books/content?id=5aBwki0xmZEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  price: 999,
  length: 272,
  publisher: 'Houghton Mifflin Harcourt',
  category: 'Fiction',
  createdAt: '2021-12-11T22:09:23.413Z',
  updatedAt: '2021-12-11T22:09:23.413Z',
  variations: [
    {
      id: 183,
      title: 'The Man in the High Castle',
      author: 'Philip K. Dick',
      description:
        'The Man in the High Castle is Dick at his best, giving readers a harrowing vision of the world that almost was. “The single most resonant and carefully imagined book of Dick’s career.” —New York Times',
      summary:
        "In this Hugo Award–winning alternative history classic—the basis for the Amazon Original series—the United States lost World War II and was subsequently divided between the Germans in the East and the Japanese in the West. It’s America in 1962. Slavery is legal once again. The few Jews who still survive hide under assumed names. In this world, we meet characters like Frank Frink, a dealer of counterfeit Americana who is himself hiding his Jewish ancestry; Nobusuke Tagomi, the Japanese trade minister in San Francisco, unsure of his standing within the bureaucracy and Japan's with Germany; and Juliana Frink, Frank's ex-wife, who may be more important than she realizes. These seemingly disparate characters gradually realize their connections to each other just as they realize that something is not quite right about their world. And it seems as though the answers might lie with Hawthorne Abendsen, a mysterious and reclusive author, whose best-selling novel describes a world in which the US won the War... The Man in the High Castle is Dick at his best, giving readers a harrowing vision of the world that almost was. “The single most resonant and carefully imagined book of Dick’s career.” —New York Times",
      format: 'paperback',
      ISBN13: '9780547601205',
      imageUrl:
        'http://books.google.com/books/content?id=5aBwki0xmZEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      price: 999,
      length: 272,
      publisher: 'Houghton Mifflin Harcourt',
      category: 'Fiction',
      createdAt: '2021-12-11T22:09:23.413Z',
      updatedAt: '2021-12-11T22:09:23.413Z',
    },
    {
      id: 365,
      title: 'The Man in the High Castle',
      author: 'Philip K. Dick',
      description:
        'The Man in the High Castle is Dick at his best, giving readers a harrowing vision of the world that almost was. “The single most resonant and carefully imagined book of Dick’s career.” —New York Times',
      summary:
        "In this Hugo Award–winning alternative history classic—the basis for the Amazon Original series—the United States lost World War II and was subsequently divided between the Germans in the East and the Japanese in the West. It’s America in 1962. Slavery is legal once again. The few Jews who still survive hide under assumed names. In this world, we meet characters like Frank Frink, a dealer of counterfeit Americana who is himself hiding his Jewish ancestry; Nobusuke Tagomi, the Japanese trade minister in San Francisco, unsure of his standing within the bureaucracy and Japan's with Germany; and Juliana Frink, Frank's ex-wife, who may be more important than she realizes. These seemingly disparate characters gradually realize their connections to each other just as they realize that something is not quite right about their world. And it seems as though the answers might lie with Hawthorne Abendsen, a mysterious and reclusive author, whose best-selling novel describes a world in which the US won the War... The Man in the High Castle is Dick at his best, giving readers a harrowing vision of the world that almost was. “The single most resonant and carefully imagined book of Dick’s career.” —New York Times",
      format: 'ebook',
      ISBN13: '9780547601205',
      imageUrl:
        'http://books.google.com/books/content?id=5aBwki0xmZEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      price: 999,
      length: 272,
      publisher: 'Houghton Mifflin Harcourt',
      category: 'Fiction',
      createdAt: '2021-12-11T22:09:23.413Z',
      updatedAt: '2021-12-11T22:09:23.413Z',
    },
  ],
};

describe('SingleProduct', () => {
  let singleProduct, store, mockAxios;
  const initialState = { singleProduct: book };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  xit('renders the book information', () => {
    singleProduct = shallow(
      <MemoryRouter>
        <Provider store={store}>
          <SingleProduct />
        </Provider>
      </MemoryRouter>
    );
    // console.dir(singleProduct.find('div'));
    // console.log('found this', shallow(() => <div>MyText</div>).text());
    // expect(singleProduct).find('h4').to.include.text('The');
    // expect(singleProduct).to.have.value('')
    const TestComponent = () => (
      <body>
        <div>Test</div>
      </body>
    );
    // console.log(
    //   shallow(<TestComponent />)
    //     .find('div')
    //     .text()
    // );
    console.log(singleProduct.find('div').text());
  });
});
