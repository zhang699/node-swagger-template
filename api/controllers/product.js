import { execute } from '../helpers/api';

import { Product } from '../../model/product';

async function list(req) {
  const { name } = req.query;
  return Product.list({ name });
}

async function create(req) {
  const productContent = req.body;
  return Product.createOne(productContent);
}
async function findByName(req) {
  const name = req.swagger.params.name.value;
  return Product.findByName(name);
}

module.exports = {
  list: execute(list),
  create: execute(create),
  findByName: execute(findByName),
};
