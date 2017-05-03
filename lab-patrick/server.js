'use strict';

const http = require('http');
const Router = require('./lib/router');
// const storage = require('./lib/storage');
// const Car = require('./model/cars');
// const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./routes/car-routes')(router);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
