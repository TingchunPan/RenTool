import mongoose from 'mongoose';
/**
 * @author Ting-chun Pan
 * @reference https://github.com/basir/amazona/blob/master/backend/models/productModel.js
 */
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    surface: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    deposit: { type: Number, required: true },

  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('products', productSchema);

export default Product;