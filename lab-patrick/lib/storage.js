'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('shema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('shema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.updateItem = function(schema, id, car){
  debug('#updateItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('shema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    if(item.name) item.name = car.name;
    if(item.model) item.model = car.model;
    if(item.horsepower) item.horsepower = car.horsepower;

    resolve(car);
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('shema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    delete(schemaName[id]);
    resolve(item);
  });
};
