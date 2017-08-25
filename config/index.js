

module.exports = process.env.NODE_ENV === 'prod' ? require('./prod') : require('./dev');

