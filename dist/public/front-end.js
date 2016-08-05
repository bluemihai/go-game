'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lastPlayer = 'W';

$(document).ready(function () {
  updateBoardColors();
  lastPlayer = lastToMove();
  $('.available').click(recordMove);
  $('a.delete-link').click(destroyGame);
});

var destroyGame = function destroyGame() {
  var gameId = this.id.replace('delete-', '');
  $.ajax({
    url: '/games/' + gameId,
    type: 'DELETE',
    success: function success(results) {
      console.log('results', results);
    },
    error: function error(_error) {
      console.log('error:', _error);
    }
  });
  $('#game-' + gameId).remove();
};

var recordMove = function recordMove() {
  lastPlayer = lastPlayer === 'B' ? 'W' : 'B';
  $(this).html(lastPlayer);
  $(this).off('click');
  $(this).removeClass('available');
  $(this).addClass(lastPlayer);
  updateGame(getGameId(), getBoardString());
};

var getGameId = function getGameId() {
  return $('#title-id').html();
};

var getCellIds = function getCellIds() {
  var range = [].concat(_toConsumableArray(Array(81).keys()));
  return range.map(function (k) {
    return '#cell-' + k;
  });
};

var updateBoardColors = function updateBoardColors() {
  return getCellIds().map(function (k) {
    var value = $(k).html();
    if (value === '.') {
      $(k).addClass('available');
    } else {
      // (value === 'B' || 'W')
      $(k).addClass(value);
    }
  });
};

var lastToMove = function lastToMove() {
  var board = getBoardString();
  var Bs = (board.match(/B/g) || []).length;
  var Ws = (board.match(/W/g) || []).length;
  console.log('Bs', Bs);
  console.log('Ws', Ws);
  return Bs > Ws ? 'B' : 'W';
};

var getBoardString = function getBoardString() {
  return getCellIds().map(function (k) {
    return $(k).html();
  }).join('');
};

var updateGame = function updateGame(id, board) {
  console.log('Updating game...');
  // $.post('/games/update', { id: id, board: board})
  var data = { id: id, board: board };
  return $.ajax({
    // Horrible hack, but can't seem to get index.js to see req.params or req.query or req.body otherwise  - TODO: refactor
    url: '/games/' + id + '/update/' + board,
    type: 'PUT',
    success: function success(results) {
      console.log('results', results);
    },
    data: data
  });
};