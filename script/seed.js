const fs = require('fs');
const path = require('path');

const {
  db,
  models: { User },
} = require('../server/db');
const Product = require('../server/db/models/Product');

const USER_DATA = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../', 'bin', 'userData.json'), 'utf8')
);
const PRODUCT_DATA = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../', 'bin', 'productData.json'),
    'utf8'
  )
);

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Sync SEED_DATA
  await User.bulkCreate(USER_DATA);
  console.log(`seeded ${USER_DATA.length} data entries`);

  await Product.bulkCreate(PRODUCT_DATA);
  console.log(`seeded ${PRODUCT_DATA.length} data entries`);

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err.parent.code);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
