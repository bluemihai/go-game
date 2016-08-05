'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyGame = exports.updateGame = exports.retrieveAllGames = exports.retrieveGame = exports.createGame = undefined;

var _initializeDatabase = require('./initializeDatabase');

var createGame = function createGame(boardString) {
  var queryString = "INSERT INTO games (board, active) \
  VALUES ('" + (boardString || '.........') + "', true) \
  RETURNING id;";
  (0, _initializeDatabase.query)(queryString);
};

var retrieveGame = function retrieveGame(gameId) {
  var queryString = 'SELECT * FROM games WHERE id=' + gameId + ';';
  return (0, _initializeDatabase.query)(queryString);
};

var retrieveAllGames = function retrieveAllGames() {
  var queryString = 'SELECT * FROM games;';
  return (0, _initializeDatabase.query)(queryString);
};

var updateGame = function updateGame(gameId, board) {
  var queryString = "UPDATE games SET board='" + board + "' WHERE id=" + gameId + ';';
  return (0, _initializeDatabase.query)(queryString);
};

var destroyGame = function destroyGame(gameId) {
  var queryString = 'DELETE FROM games WHERE id=' + gameId + ' RETURNING board;';
  return (0, _initializeDatabase.query)(queryString);
};

exports.createGame = createGame;
exports.retrieveGame = retrieveGame;
exports.retrieveAllGames = retrieveAllGames;
exports.updateGame = updateGame;
exports.destroyGame = destroyGame;