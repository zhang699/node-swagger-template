import { Product } from "../../model/product";
import { responseToErr, responseToResult } from "../helpers/request";
function list(req, res) {
  const { name } = req.query;
  Product.list({ name }).then(results => {
    responseToResult(res, results);
  });
}

function create(req, res) {
  const productContent = req.body;
  Product.createOne(productContent).then(result => {
    responseToResult(res, result);
  });
}
function findByName(req, res) {
  const name = req.swagger.params.name.value;
  Product.findByName(name)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      responseToErr(res, err);
    });
}
module.exports = {
  list,
  create,
  findByName
};
