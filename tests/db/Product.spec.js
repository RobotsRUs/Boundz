const { expect } = require('chai');
const {
  db,
  models: { Product },
} = require('../../server/db');

const BOOKS = [
  {
    id: 1,
    title: 'My First Book',
    author: 'John Doe',
    description: 'Description of my first book',
    summary: 'Summary of my first book',
    format: 'hardcover',
    ISBN13: '1234567890123',
    imageUrl: 'http://www.google.com/book1.jpg',
    price: 1000,
    length: 300,
    publisher: 'My First Publisher',
    category: 'Fiction',
  },
  {
    id: 2,
    title: 'My First Book',
    author: 'John Doe',
    description: 'Description of my first book',
    summary: 'Summary of my first book',
    format: 'paperback',
    ISBN13: '1234567890123',
    imageUrl: 'http://www.google.com/book1.jpg',
    price: 500,
    length: 300,
    publisher: 'My First Publisher',
    category: 'Fiction',
  },
  {
    id: 3,
    title: 'My First Book',
    author: 'John Doe',
    description: 'Description of my first book',
    summary: 'Summary of my first book',
    format: 'ebook',
    ISBN13: '1234567890123',
    imageUrl: 'http://www.google.com/book1.jpg',
    price: 250,
    length: 300,
    publisher: 'My First Publisher',
    category: 'Fiction',
  },
  {
    id: 4,
    title: 'My Second Book',
    author: 'John Doe',
    description: 'Description of my second book',
    summary: 'Summary of my second book',
    format: 'ebook',
    ISBN13: '1234567890123',
    imageUrl: 'http://www.google.com/book1.jpg',
    price: 250,
    length: 300,
    publisher: 'My Second Publisher',
    category: 'Fiction',
  },
];

describe('Product model', () => {
  beforeEach(async () => {
    await Product.sync({ force: true });
    await Product.bulkCreate(BOOKS);
  });

  describe('class methods', () => {
    describe('findById', () => {
      it('returns a token with the id of the user', async () => {
        const book1 = await Product.findById(1);
        const book2 = await Product.findById(4);
        const book3 = await Product.findById(100);
        expect(book1.dataValues.title).to.equal(BOOKS[0].title);
        expect(book1.dataValues.variations).to.be.an('array');
        expect(book1.dataValues.variations).to.have.lengthOf(2);
        expect(book1.dataValues.variations[0].title).to.equal(BOOKS[2].title);

        expect(book2.dataValues.title).to.equal(BOOKS[3].title);
        expect(book2.dataValues.variations).to.be.an('array');
        expect(book2.dataValues.variations).to.have.lengthOf(0);

        expect(book3).to.equal(null);
      });
    }); // end describe('findById')
  }); // end describe('class methods')
}); // end describe('User model')
