import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  buildSchema,
  GraphQLInputObjectType
} from "graphql";

import { Product, City } from "../../model/product";
const product = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const inputProduct = new GraphQLInputObjectType({
  name: "InputProduct",
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});
const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: product,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(_, { id }) {
        const res = await Product.findOne({ _id: id });
        return res;
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    createProduct: {
      type: product,
      args: {
        product: { type: inputProduct }
      },
      resolve: async (_, { product }) => {
        const res = await Product.collection.insertOne(product);

        const id = res.insertedId;
        const insertedProduct = await Product.findOne({ _id: id });
        return insertedProduct;
      }
    }
  }
});

const schema = new GraphQLSchema({ query, mutation });
export { schema, root };
