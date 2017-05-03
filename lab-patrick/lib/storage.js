'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
// const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('shema required'));
  if(!item) return Promise.reject(new Error('item required'));
  // if(!storage[schema]) storage[schema] = {};

  // storage[schema][item.id] = item;
  let stringItem = JSON.stringify(item);
  console.log('about to wite to file');
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, stringItem)
  .then(() => item)
  .catch(err => Promise.reject(err));
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('shema required'));
    if(!id) return reject(new Error('id required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) =>{
      let parseItem = JSON.parse(data.toString());

      return resolve(parseItem);
    })
    .catch(err => Promise.reject(err));
  });
};

exports.updateItem = function(schema, id, car){
  debug('#updateItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('shema required'));
    if(!id) return reject(new Error('id required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) =>{
      let parseItem = JSON.parse(data.toString());
      console.log(parseItem);

      // parseItem.name = car.name;
      // parseItem.model = car.model;
      // parseItem.horsepower = car.horsepower;

      fs.writeFileProm(`${__dirname}/../data/${schema}/${parseItem.id}.json`, parseItem)
      .then(() => parseItem)
      .catch(err => Promise.reject(err));
      return resolve(car);
    });
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('shema required'));
    if(!id) return reject(new Error('id required'));

    fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`);
    return resolve();

  });
};
