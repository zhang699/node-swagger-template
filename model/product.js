import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});

ProductSchema.statics.createOne = async function(content) {
  const product = new Product(content);
  return await product.save();
};
ProductSchema.statics.list = async function(query) {
  console.warn("list,...");
  return await this.find(query);
};

export const Product = mongoose.model("Product", ProductSchema);
