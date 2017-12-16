import { Product } from "../../model/product";

function list(req, res) {
  const { name } = req.query;
  Product.list({ name }).then(results => {
    res.json(results);
  });
}

function create(req, res) {
  const productContent = req.body;
  Product.createOne(productContent).then(result => {
    res.json(result);
  });
}
module.exports = {
  list,
  create
};
