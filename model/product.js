import mongoose, { Schema } from 'mongoose';
import ApplicationError from './errors/ApplicationError';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

ProductSchema.statics.createOne = async function createOne(content) {
  const product = new Product(content);
  return product.save();
};
ProductSchema.statics.list = async function list(query) {
  return this.find(query);
};
ProductSchema.statics.findByName = async function findByName(name) {
  const product = await this.findOne({ name });
  ApplicationError.throwIfProductNotFound(product, name);
  return product;
};

export const Product = mongoose.model('Product', ProductSchema);
