import mongoose from "mongoose";
import Promise from "bluebird";
import { MONGODB_URI } from "../../config";

const options = {
  server: {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
};

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, options);

export const connection = mongoose.connection;
connection.on("error", e => {
  if (e.message.code === "ETIMEDOUT") {
    console.error(e);
    mongoose.connect(MONGODB_URI, options);
  }
  console.error(e);
});
connection.once("open", () => {
  console.log(`MongoDB successfully connected to ${MONGODB_URI}`);
});
