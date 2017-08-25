


function list(req, res) {
  const { name } = req.query;
  res.json({
    message: `you are listing products, the filter name is ${name}`,
  });
}


function create(req, res) {
  const productContent = req.body;
  res.json({
    message: `you are creating the product, the information is ${productContent}`,
  })
}
module.exports = {
  list,
  create
}