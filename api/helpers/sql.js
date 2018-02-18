const { Connection, Request, TYPES } = require('tedious');
const ConnectionPool = require('tedious-connection-pool');

const humps = require('humps');
const databaseConfig = require('../../config').database;

const config = databaseConfig;

const connection = new Connection(config);

connection.on('connect', (err) => {
  // console.warn(`DB ${!err ? `Connected to ${config.server}` : 'Not Connected'}`, err);
});

const poolConfig = {
  min: 20,
  max: 1000,
  log: true,
};

const pool = new ConnectionPool(poolConfig, config);

function executeStatement(sql, onPrepare) {
  // console.warn('sql log', sql);
  return new Promise((resolve, reject) => {
    pool.acquire((err, connection) => {
      const rowResult = [];
      const request = new Request(sql, (err, affectedRows) => {
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
        });

        rowResult.push({
          result: humps.camelizeKeys(contentColumn),
          metadata: columns,
        });
      });
      request.on('done', () => {
        // console.warn('rowResult.done', rowResult)
      });

      request.on('requestCompleted', () => {
        // Next SQL statement.
        // console.warn('onRequestCompleted');
        resolve(rowResult);
      });
      connection.execSql(request);
    });
  });
}

module.exports = {
  executeStatement,
  TYPES,
};
