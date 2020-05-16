'use strict';
const mongodb = require('mongodb');
const assert = require('assert');
let count = 0;
module.exports = app => {
  app.addSingleton('mongo', createMongo);
};

/**
 * filter the auth of url string
 * @param {URL} input url
 * @return {String} filtered url
 * @see https://docs.mongodb.com/manual/reference/connection-string/
 */
function filterURLPassword(input) {
  const index = input.indexOf('@');
  if (index === -1) return input;
  const startIndex = input.lastIndexOf(':', index);
  return input.substring(0, startIndex + 1) + '******' + input.substring(index);
}

function createMongo(config, app) {

  const { uri, dbName, options } = config;
  assert.ok(uri, '[egg-mongo] uri is required on config');

  const filteredURL = filterURLPassword(uri);

  const client = new mongodb.MongoClient(uri, options);


  client.on('error', err => {
    err.message = `[egg-mongo]${err.message}`;
    app.coreLogger.error(err);
  });

  client.on('disconnected', () => {
    app.coreLogger.error(`[egg-mongo] ${filteredURL} disconnected`);
  });

  client.on('connected', () => {
    app.coreLogger.info(`[egg-mongo] ${filteredURL} connected successfully`);
  });

  client.on('reconnected', () => {
    app.coreLogger.info(`[egg-mongo] ${filteredURL} reconnected successfully`);
  });

  app.beforeStart(() => {
    app.coreLogger.info('[egg-mongo] connecting server', filteredURL);
    const index = count++;
    client.connect(err => {
      assert.equal(null, err);
      app.coreLogger.info(`[egg-mongo] instance[${index}] start successfully`);
    });
  });

  return client;
}