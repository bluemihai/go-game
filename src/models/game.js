//pieces are placed on board intersections.
//establish two player game



//ko: not allowed to make a move that returns the game to the previous state (no repetitive play)
//suicide: can't place a piece in a location where it will have zero freedoms
//score: number stones on the board plus the empty spaces controlled by those pieces
//dame: area controlled by neither black or white = no score
//board is 9x9 - pieces placed on corner have 2 freedoms and placed on edges have 3 freedoms
//game is over when both players pass twice consecutively or simply agree to end the game


String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length)
}

//black and white pieces
//black goes first
export class Game {
  constructor(size = 9) {
    let cellCount = Math.pow(size, 2)
    this.board = [...Array(cellCount).keys()].map(k => '.').join('')
    this.isBlackNext = true
    this.size = size
  }

  suicide(position) {
    let freedoms = this.freedoms(position, this.nextPlayer())
    console.log('freedoms', freedoms)
    return freedoms === 0 ? true : false
  }

  //two player game switching
  nextPlayer() {
    return this.isBlackNext ? 'B' : 'W'
  }

// activating a placement
  place(position) {
    this.board = this.board.replaceAt(position, this.nextPlayer())
    this.isBlackNext = !this.isBlackNext
  }

  freedoms(position, color) {
    let temp = this.getNeighbors(position).map(k => k === color ? 1 : 0)
    return temp.reduce((prev, curr) => prev + curr)
  }

  getNeighbors(position) {
    let x = position % this.size
    let y = Math.floor(position / this.size)
    return [
      this.board[this.xyToPosition(x - 1, y)],
      this.board[this.xyToPosition(x + 1, y)],
      this.board[this.xyToPosition(x, y - 1)],
      this.board[this.xyToPosition(x, y + 1)]
    ]
  }

  xyToPosition(x, y) {
    return this.size * y + x
  }

}
