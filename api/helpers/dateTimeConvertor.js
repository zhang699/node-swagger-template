

const moment = require('moment');

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss:SSS';
function convertToLocal(iso8601WithoutTimeZoneStr, timeFormat = DEFAULT_FORMAT){
  if (!iso8601WithoutTimeZoneStr) {
    return null;
  }
  const date = moment(iso8601WithoutTimeZoneStr, timeFormat).format();

  return date;
}

function localTimestamp(date) {
  //const nowInTimezone = moment(new Date()).local().toDate();
  const timestamp = date.getTime() + ( - date.getTimezoneOffset() * 60000);
  return timestamp;
}

function localDate(date = new Date()) {
  return new Date(localTimestamp(date));
}
module.exports = {
  convertToLocal,
  localTimestamp,
  localDate,
}


//console.log(convertToLocal('2017-06-16 18:06:37:660'));