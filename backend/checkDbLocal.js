const fs = require('fs');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ name: String }, { strict: false });
const Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://127.0.0.1:27017/sholash')
  .then(async () => {
    const products = await Product.find({});
    const output = `There are ${products.length} products in the LOCAL database.\n` + 
                   (products.length > 0 ? `Names: ${products.map(p => p.name).join(', ')}` : '');
    fs.writeFileSync('dbLocalOutput.txt', output);
    process.exit(0);
  })
  .catch(err => {
    fs.writeFileSync('dbLocalOutput.txt', `Could not connect to local DB: ${err.message}`);
    process.exit(1);
  });
