function mapResult(queryResult, mapper) {
  return queryResult.map((row) => {
    const rowContent = row.result || {};
    return mapper(rowContent);
  })
}

module.exports = {
  mapResult,
}