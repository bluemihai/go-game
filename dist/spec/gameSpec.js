'use strict';

var _game = require('../models/game');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

String.prototype.printSquare = function () {
  var _this = this;

  var size = Math.log2(this.length);
  if (size === Math.floor(size)) {
    return '\n' + [].concat(_toConsumableArray(Array(size).keys())).map(function (k) {
      return _this.slice(k * size, (k + 1) * size);
    }).join('\n');
  } else {
    return 'Length of your string is not a perfect square!!';
  }
};

describe('Game Class', function () {
  it('checks that new game gets initialized correctly', function () {
    expect(new _game.Game(4).board.length).toEqual(16);
    expect(new _game.Game(9).board.length).toEqual(81);
  });

  it('#place works', function () {
    var g = new _game.Game(2);
    expect(g.board).toEqual('....');
    g.place(2);
    expect(g.board).toEqual('..B.');
    g.place(1);
    expect(g.board).toEqual('.WB.');
  });

  it('#xyToPosition', function () {
    var g = new _game.Game(3);
    expect(g.xyToPosition(0, 0)).toEqual(0);
    expect(g.xyToPosition(1, 0)).toEqual(1);
    expect(g.xyToPosition(2, 0)).toEqual(2);
    expect(g.xyToPosition(0, 1)).toEqual(3);
    expect(g.xyToPosition(1, 1)).toEqual(4);
    expect(g.xyToPosition(2, 1)).toEqual(5);
    expect(g.xyToPosition(0, 2)).toEqual(6);
    expect(g.xyToPosition(1, 2)).toEqual(7);
    expect(g.xyToPosition(2, 2)).toEqual(8);
  });

  it('#nextPlayer() works', function () {
    var g = new _game.Game(2);
    expect(g.nextPlayer()).toEqual('B');
    g.place(2);
    expect(g.nextPlayer()).toEqual('W');
    g.place(1);
    expect(g.nextPlayer()).toEqual('B');
  });

  it('refuses to place if location already occupied', function () {
    var g = new _game.Game(2);
    g.board = 'BWBW';
    expect(g.board).toEqual('BWBW');
    var result = g.place(2);
    expect(g.board).toEqual('BWBW');
  });

  it('#neighbors works', function () {
    var g = new _game.Game(3);
    g.board = '.WBW.WBWB';
    expect(g.neighbors(4)).toEqual(['W', 'W', 'W', 'W']);
  });

  it('#freedoms works', function () {
    var g = new _game.Game(3);
    g.board = '.WBW.WBWB';
    expect(g.freedoms(0, 'W')).toEqual(2);
    expect(g.freedoms(0, 'B')).toEqual(0);
    expect(g.freedoms(1, 'W')).toEqual(2);
    expect(g.freedoms(1, 'B')).toEqual(3);
    expect(g.freedoms(4, 'W')).toEqual(4);
    expect(g.freedoms(4, 'B')).toEqual(0);
  });

  it('#suicide works for true', function () {
    var g = new _game.Game(4); // x 2 y 1 position 6
    g.board = '..W..W.W..W.....';
    expect(g.freedoms(6, g.nextPlayer())).toEqual(0);
    expect(g.suicide(6)).toEqual(true);
  });

  it('#suicide works for false', function () {
    var g = new _game.Game(15);
    g.board = '..W..W.W..W.....';
    expect(g.freedoms(15, g.nextPlayer())).toEqual(2);
    expect(g.suicide(15)).toEqual(false);
  });

  it('#ko works', function () {
    var g = new _game.Game(4);
    g.board = '................';
  });
});