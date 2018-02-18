function getCountry(req, res) {
  const countryId = req.swagger.params.id.value || '';

  res.json({
    message: `the specific country id is ${countryId}`,
  });
}

module.exports = {
  getCountry,
};
