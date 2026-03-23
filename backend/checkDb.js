const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sholash')
  .then(async () => {
    const products = await Product.find({});
    const output = `There are ${products.length} products in the database.\n` + 
                   (products.length > 0 ? `Names: ${products.map(p => p.name).join(', ')}` : '');
    fs.writeFileSync('dbOutput.txt', output);
    process.exit(0);
  })
  .catch(err => {
    fs.writeFileSync('dbOutput.txt', err.toString());
    process.exit(1);
  });
