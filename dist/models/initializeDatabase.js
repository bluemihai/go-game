'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bluebird = require('bluebird');
var options = {
  promiseLib: bluebird // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);
var connection = {
  host: 'localhost',
  port: 5432,
  database: 'go-bison'
};

var db = pgp(connection);

function sql(file) {
  return new pgp.QueryFile(file, { minify: true });
}

var sqlInit = sql('./db.sql');

var query = function query(string) {
  db.any(string).then(function (data) {
    // console.log('data', data)
    return data;
  }).catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  }).finally(pgp.end());
};

query('SELECT * FROM games;');

exports.bluebird = bluebird;
exports.pgp = pgp;
exports.db = db;
exports.query = query;