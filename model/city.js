import mongoose, { Schema } from "mongoose";

const CitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

export const City = mongoose.model("City", CitySchema);
