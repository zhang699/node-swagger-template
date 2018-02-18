import { responseToErr, responseToResult } from './request';

export function execute(doExecute) {
  return (req, res, next) => {
    try {
      const result = doExecute(req, res, next);
      if (result instanceof Promise) {
        result
          .then(data => {
            responseToResult(res, data);
          })
          .catch(err => {
            responseToErr(res, err);
          });
      } else {
        responseToResult(res, result);
      }
    } catch (e) {
      responseToErr(res, e);
    }
  };
}
