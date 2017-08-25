const { Connection, Request, TYPES } = require('tedious');
var ConnectionPool = require('tedious-connection-pool');

const humps = require('humps')
const databaseConfig = require('../../config').database;
var config = databaseConfig;

var connection = new Connection(config);

connection.on('connect', (err) => {
  console.warn(`DB ${!err ? `Connected to ${config.server}` : 'Not Connected'}`, err);
});

var poolConfig = {
  min: 20,
  max: 1000,
  log: true
};


var pool = new ConnectionPool(poolConfig, config);

function executeStatement(sql, onPrepare) {
  console.warn('sql log', sql);
  return new Promise((resolve, reject) => {
    pool.acquire((err, connection) => {
      const rowResult = [];
      var request = new Request(sql,
        function (err, affectedRows) {
          if (err) {
            reject(err);
          }
          connection.release();
        });
      if (onPrepare) {
        onPrepare(request);
      }

      request.on('row', (columns) => {
        const contentColumn = {};
        columns.map((column) => {
          contentColumn[column.metadata.colName] = column.value;
        })
        
        rowResult.push({
          result: humps.camelizeKeys(contentColumn),
          metadata: columns,
        })
      });
      request.on('done', () => {
        //console.warn('rowResult.done', rowResult)

      });

      request.on('requestCompleted', function () {
        // Next SQL statement.
        //console.warn('onRequestCompleted');
        resolve(rowResult);
      });
      connection.execSql(request);
    });

  });

}

module.exports = {
  executeStatement,
  TYPES,
}