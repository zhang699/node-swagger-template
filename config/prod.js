module.exports = {
  /**for sql */
  database: {
    userName: "<Your username>",
    password: "<Your address>",
    server: "<Your server adresss>", // eample value is 127.0.0.1
    options: {
      database: "<Your database name>"
    }
  },
  /** for mongodb */
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/node-swagger-template"
};
