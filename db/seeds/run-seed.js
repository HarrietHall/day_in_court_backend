const devData = require('../data/test_data/index.js');
const seed = require('./seed.js');
const db = require('../index.js');

const runSeed = () => {
  console.log('here')
  return seed(devData).then(() => db.end());
};

runSeed();
