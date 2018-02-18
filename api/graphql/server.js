import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema, root } from './schema';

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
      path: error.path,
    }),
  })
);

app.listen(10011);
