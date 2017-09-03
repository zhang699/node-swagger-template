import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

export const Product = mongoose.model("Product", ProductSchema);
