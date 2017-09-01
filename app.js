"use strict";

var SwaggerExpress = require("swagger-express-mw");
var express = require("express");
var cors = require("cors");
var app = express();
module.exports = app; // for testing

app.use(cors());
/** connect to mongodb */
require("./api/helpers/mongodb");

const TOKEN = "Ss-^3EnbsM`Mbp(#ou2})&wXYn|Pu";
var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    Bearer: function(req, authOrSecDef, scopesOrApiKey, callback) {
      if (scopesOrApiKey === TOKEN) {
        callback();
      } else {
        callback(new Error("API Key not matched"));
      }
    }
  }
};

app.use(express.static("swagger"));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
