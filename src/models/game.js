//pieces are placed on board intersections.
//establish two player game



//ko: not allowed to make a move that returns the game to the previous state (no repetitive play)
//suicide: can't place a piece in a location where it will have zero freedoms
//score: number stones on the board plus the empty spaces controlled by those pieces
//dame: area controlled by neither black or white = no score
//board is 9x9 - pieces placed on corner have 2 freedoms and placed on edges have 3 freedoms
//game is over when both players pass twice consecutively or simply agree to end the game

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length)
}
String.prototype.printSquare = function () {
  var _this = this

  var size = Math.log2(this.length)
  if (size === Math.floor(size)) {
    return '\n' + [].concat(_toConsumableArray(Array(size).keys())).map(function (k) {
      return _this.slice(k * size, (k + 1) * size)
    }).join('\n')
  } else {
    return 'Length of your string is not a perfect square!!'
  }
}

export class Game {
  constructor(size = 9) {
    let cellCount = Math.pow(size, 2)
    this.board = [...Array(cellCount).keys()].map(k => '.').join('')
    this.isBlackNext = true
    this.size = size
    this.boardHistory = []
  }

  nextPlayer() {
    return this.isBlackNext ? 'B' : 'W'
  }

  place(position) {
    if (this.occupied(position)) return false
    if (this.suicide(position)) return false
    if (this.ko(position)) return false

    this.board = this.board.replaceAt(position, this.nextPlayer())
    this.boardHistory.push(this.board)
    this.isBlackNext = !this.isBlackNext
    return true      
  }

  neighbors(position) {
    let x = position % this.size
    let y = Math.floor(position / this.size)
    return [
      this.board[this.xyToPosition(x - 1, y)],
      this.board[this.xyToPosition(x + 1, y)],
      this.board[this.xyToPosition(x, y - 1)],
      this.board[this.xyToPosition(x, y + 1)]
    ].clean()
  }

  freedoms(position, color) {
    let other = color === 'B' ? 'W' : 'B'
    let temp = this.neighbors(position).map(k => {
      if (k === color || k === '.' ) {
        return 1
      } else {
        return 0
      }
    })
    return temp.reduce((prev, curr) => prev + curr)
  }

  occupied(position) {
    return !(this.board[position] === '.')
  }

  suicide(position) {
    let freedoms = this.freedoms(position, this.nextPlayer())
    return freedoms === 0 ? true : false
  }

  ko(position) {
    this.place(position)
    let potentialBoard = this.board.pop
    if (this.boardHistory.indexOf(potentialBoard) === -1) {
      return true
    } else {
      return false
    }
  }

  xyToPosition(x, y) {
    return this.size * y + x
  }

  squareBoard() {
    return this.board.printSquare()
  }

}
