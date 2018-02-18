import { execute } from '../helpers/api';

function getCountry(req) {
  const countryId = req.swagger.params.id.value || '';

  return {
    message: `the specific country id is ${countryId}`,
  };
}

module.exports = {
  getCountry: execute(getCountry),
};
