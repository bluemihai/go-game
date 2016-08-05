'use strict';

var _initializeDatabase = require('./models/initializeDatabase');

var _game = require('./public/game');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var game = require('./public/game');

var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var pug = require('pug');


app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  _initializeDatabase.db.one("INSERT INTO games(board, active) VALUES ($1, $2) RETURNING id", ['.................................................................................', true]).then(function (data) {
    res.render('index', {
      welcome: 'Welcome to the Go Peace game.',
      gameId: data.id,
      title: 'Game iD ',
      message: 'Click to place Black or White piece.',
      board: '.................................................................................'.split('')
    });
  }).catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  }).finally(_initializeDatabase.pgp.end());
});

app.put('/games/:id/update/:board', function (req, res) {
  var board = req.params.board;
  var id = req.params.id;
  var queryString = "UPDATE games SET board='" + board + "' WHERE id=" + id + ';';

  _initializeDatabase.db.any(queryString).then(function (data) {}).catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  }).finally(_initializeDatabase.pgp.end());
});

app.get('/games', function (req, res) {
  _initializeDatabase.db.any('SELECT * FROM games;').then(function (data) {
    var ids = data.map(function (e) {
      return e.id;
    }).sort();
    res.render('games', {
      title: 'Here are available games.',
      message: 'Please click below on a Game iD in order to play.',
      games: data
    });
  }).catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  }).finally(_initializeDatabase.pgp.end());
});

app.get('/games/:id', function (req, res) {
  _initializeDatabase.db.one('SELECT * FROM games WHERE id=' + req.params.id + ';').then(function (data) {
    res.render('index', {
      gameId: data.id,
      title: 'Game iD ',
      message: 'Click to move. Your board is saved automatically.',
      board: data.board.split('')
    });
  }).catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  }).finally(_initializeDatabase.pgp.end());
});

app.delete('/games/:id', function (req, res) {
  var queryString = 'DELETE FROM games WHERE id=' + req.params.id + ';';
  _initializeDatabase.db.any(queryString).then(function (data) {
    return 'Done!';
  }).catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  }).finally(_initializeDatabase.pgp.end());
});

var inRowsOf = function inRowsOf(str, size) {
  [].concat(_toConsumableArray(Array(size).keys())).map(function (k) {
    return str.splice(k * 9, 9);
  }).join('\n');
};