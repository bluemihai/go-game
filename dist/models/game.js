'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//pieces are placed on board intersections.
//establish two player game


//ko: not allowed to make a move that returns the game to the previous state (no repetitive play)
//suicide: can't place a piece in a location where it will have zero freedoms
//score: number stones on the board plus the empty spaces controlled by those pieces
//dame: area controlled by neither black or white = no score
//board is 9x9 - pieces placed on corner have 2 freedoms and placed on edges have 3 freedoms
//game is over when both players pass twice consecutively or simply agree to end the game

Array.prototype.clean = function (deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
String.prototype.replaceAt = function (index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};
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

var Game = exports.Game = function () {
  function Game() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 9 : arguments[0];

    _classCallCheck(this, Game);

    var cellCount = Math.pow(size, 2);
    this.board = [].concat(_toConsumableArray2(Array(cellCount).keys())).map(function (k) {
      return '.';
    }).join('');
    this.isBlackNext = true;
    this.size = size;
    this.boardHistory = [];
  }

  _createClass(Game, [{
    key: 'nextPlayer',
    value: function nextPlayer() {
      return this.isBlackNext ? 'B' : 'W';
    }
  }, {
    key: 'place',
    value: function place(position) {
      if (this.occupied(position)) return false;
      if (this.suicide(position)) return false;
      if (this.ko(position)) return false;

      this.board = this.board.replaceAt(position, this.nextPlayer());
      this.boardHistory.push(this.board);
      this.isBlackNext = !this.isBlackNext;
      return true;
    }
  }, {
    key: 'neighbors',
    value: function neighbors(position) {
      var x = position % this.size;
      var y = Math.floor(position / this.size);
      return [this.board[this.xyToPosition(x - 1, y)], this.board[this.xyToPosition(x + 1, y)], this.board[this.xyToPosition(x, y - 1)], this.board[this.xyToPosition(x, y + 1)]].clean();
    }
  }, {
    key: 'freedoms',
    value: function freedoms(position, color) {
      var other = color === 'B' ? 'W' : 'B';
      var temp = this.neighbors(position).map(function (k) {
        if (k === color || k === '.') {
          return 1;
        } else {
          return 0;
        }
      });
      return temp.reduce(function (prev, curr) {
        return prev + curr;
      });
    }
  }, {
    key: 'occupied',
    value: function occupied(position) {
      return !(this.board[position] === '.');
    }
  }, {
    key: 'suicide',
    value: function suicide(position) {
      var freedoms = this.freedoms(position, this.nextPlayer());
      return freedoms === 0 ? true : false;
    }
  }, {
    key: 'ko',
    value: function ko(position) {
      this.place(position);
      var potentialBoard = this.board.pop;
      if (this.boardHistory.indexOf(potentialBoard) === -1) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'xyToPosition',
    value: function xyToPosition(x, y) {
      return this.size * y + x;
    }
  }, {
    key: 'squareBoard',
    value: function squareBoard() {
      return this.board.printSquare();
    }
  }]);

  return Game;
}();