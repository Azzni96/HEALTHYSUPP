const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Alennusprosentti, oletuksena 0
  description: { type: String },
  image: { type: String },
});

// Virtuaalinen kenttä laskee alennetun hinnan
productSchema.virtual('discountedPrice').get(function() {
  return this.discount > 0
    ? this.price - (this.price * (this.discount / 100))
    : this.price;
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
