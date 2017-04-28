'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Car = require('./model/cars');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/car', function(req, res) {
  debug('GET /api/car');
  if(req.url.query.id) {
    storage.fetchItem('car', req.url.query.id)
    .then(car => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(car));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.post('/api/car', function(req, res) {
  debug('POST /api/car');
  console.log(req.body);
  try {
    let car = new Car(req.body.name, req.body.model, req.body.horsepower);
    storage.createItem('car', car);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(car));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/car', function(req, res){
  debug('PUT /api/car');
  console.log(req.body);
  if(req.body.id){
    try {
      storage.updateItem('car', req.body.id, req.body)
      .then(car =>{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(car));
        res.end();
      });
    }
    catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  }
});

router.delete('/api/car', function(req, res){
  debug('DELETE /api/car');
  console.log(req.body);
  if(req.url.query.id){
    storage.deleteItem('car', req.url.query.id)
    .then(() => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('Car deleted');
      res.end();
    })
  .catch(err => {
    console.error(err);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('not found');
    res.end();
  });
    return;
  }
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
