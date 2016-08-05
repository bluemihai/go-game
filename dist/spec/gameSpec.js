'use strict';

var _game = require('../models/game');

describe('Game Class', function () {
  it('checks that new game gets initialized correctly', function () {
    expect(new _game.Game(4).board.length).toEqual(16);
    expect(new _game.Game(9).board.length).toEqual(81);
  });

  it('#place works', function () {
    var g = new _game.Game(2);
    expect(g.board).toEqual('....');

    expect(g.place(2)).toEqual(true);
    expect(g.board).toEqual('..B.');
    expect(g.moveStack).toEqual([2]);

    expect(g.occupied(2)).toEqual(true);
    expect(g.place(2)).toEqual(false);
    expect(g.moveStack).toEqual([2]);

    expect(g.place(1)).toEqual(true);
    expect(g.board).toEqual('.WB.');
    expect(g.moveStack).toEqual([2, 1]);
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

  it('#suicide works when true', function () {
    var g = new _game.Game(4); // x 2 y 1 position 6
    g.board = '..W..W.W..W.....';
    expect(g.freedoms(6, g.nextPlayer())).toEqual(0);
    expect(g.suicide(6)).toEqual(true);
    expect(g.place(6)).toEqual(false);
  });

  it('#suicide works for false', function () {
    var g = new _game.Game(15); // bottom right corner
    g.board = '..W..W.W..W.....';
    expect(g.freedoms(15, g.nextPlayer())).toEqual(2);
    expect(g.suicide(15)).toEqual(false);
    expect(g.place(15)).toEqual(true);
  });

  it('#ko works', function () {
    var g = new _game.Game(4);
    g.board = '................';
  });
});