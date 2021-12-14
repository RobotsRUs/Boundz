const { expect } = require('chai');
const request = require('supertest');
const app = require('../../server/app');
const Product = require('../../server/db/models/Product');

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

describe('Products routes', () => {
  beforeEach(async () => {
    await Product.sync({ force: true });
    await Product.bulkCreate(BOOKS);
  });
  describe('/api/products/:productId', () => {
    describe('/GET /api/products/:productId', () => {
      it('responds with a product by its id with variations', async () => {
        const res = await request(app).get('/api/products/1').expect(200);
        expect(res.body.title).to.equal(BOOKS[0].title);
        expect(res.body.variations).to.be.an('array');
        expect(res.body.variations).to.have.lengthOf(2);
        expect(res.body.variations[0].title).to.equal(BOOKS[2].title);
      });
      it('respends with a product by its id with no variations', async () => {
        const res = await request(app).get('/api/products/4').expect(200);
        expect(res.body.title).to.equal(BOOKS[3].title);
        expect(res.body.variations).to.be.an('array');
        expect(res.body.variations).to.have.lengthOf(0);
      });
      it('responds with a 404 status if no product was found', async () => {
        await request(app).get('/api/products/100').expect(404);
      });
    }); // end describe('GET /api/products/:productId')
  }); // end describe('/api/products/:productId')
}); // end describe('Product routes')
