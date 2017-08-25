//const request = require('request');



require('es6-promise').polyfill();
require('isomorphic-fetch');



function responseToResult(res, data, status) {
  res.json({
    status: status || 0,
    data,
    message: 'ok',
  })
}
function responseToErr(res, error) {
  res.json({
    message: error.message,
    status: -1,
  });
}

function executeRequest(url, options) {
  options.json = options.json || true;
  return new Promise(function (resolve, reject) {

    let body = options.form;
    if (options.headers && options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      const urlEncodedrequest = [];
      for (const key in body) {
        urlEncodedrequest.push(`${key}=${encodeURIComponent(body[key])}`);
      }
      const requestForm = urlEncodedrequest.reduce((pre, cur) => `${pre}&${cur}`);
      body = requestForm;
    } else {
      body = JSON.stringify(body);
    }
    console.warn('body', body);
    console.warn('url', url);
    console.warn('headers', options.headers);
    fetch(url, {
      method: options.method || 'POST',
      headers: options.headers,
      body: options.method === 'GET' ? null : body,
    }).then((response) => {
      return options.json ? response.json() : response.text();
    }, (err) => {
      console.warn('err', err);
      reject(err);
    }).then(jsonResponse => {
      resolve(jsonResponse);
    });
    /*request.post({ 
      url, 
      form: options.form, 
      headers: options.headers,
      json: true,
    }, function (err, httpResponse, body) {
      console.warn('err, body', err, body);
      if (!err) {
        resolve(body);
      } else {
        reject(err);
      }
    });*/
  });
};


module.exports = {
  executeRequest,
  responseToResult,
  responseToErr,
  OK: 'ok',
  FAIL: 'fail',
}