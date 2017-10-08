import SwaggerExpress from "swagger-express-mw";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

/** connect to mongodb */
import "./api/helpers/mongodb";

const TOKEN = "Ss-^3EnbsM`Mbp(#ou2})&wXYn|Pu";
const config = {
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

  const port = process.env.PORT || 10010;
  app.listen(port);
});

export default app;
