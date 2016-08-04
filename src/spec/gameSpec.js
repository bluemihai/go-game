import { Game } from '../models/game'

describe('Game Class', () => {
  it('checks that new game gets initialized correctly', () => {
    expect(new Game(4).board.length).toEqual(16)
    expect(new Game(9).board.length).toEqual(81)
  })

  it('places correctly', () => {
    let g = new Game(2)
    expect(g.board).toEqual('....')
    g.place(2)
    expect(g.board).toEqual('..B.')
    g.place(1)
    expect(g.board).toEqual('.WB.')
  })

  it('#nextPlayer() return B with empty board', () => {
    let g = new Game(2)
    expect(g.nextPlayer()).toEqual('B')
    g.place(2)
    expect(g.nextPlayer()).toEqual('W')
    g.place(1)
    expect(g.nextPlayer()).toEqual('B')
  })

  it('refuses to place if location already occupied', () => {
    let g = new Game(2)
    g.board = 'BWBW'
    expect(g.board).toEqual('BWBW')
    let result = g.place(2)
    expect(g.board).toEqual('BWBW')
  })

  it('#getNeighbors works', () => {
    let g = new Game(3)
    g.board = '.WBW.WBWB'
    expect(g.getNeighbors(4)).toEqual(['W', 'W', 'W', 'W'])
  })  

  fit('#freedoms works', () => {
    let g = new Game(3)
    g.board = '.WBW.WBWB'
    expect(g.freedoms(4, 'W')).toEqual(4)
    expect(g.freedoms(4, 'B')).toEqual(0)
  })

  it('#xyToPosition', () => {
    let g = new Game(3)
    expect(g.xyToPosition(0, 0)).toEqual(0)
    expect(g.xyToPosition(1, 0)).toEqual(1)
    expect(g.xyToPosition(2, 0)).toEqual(2)
    expect(g.xyToPosition(0, 1)).toEqual(3)
    expect(g.xyToPosition(1, 1)).toEqual(4)
    expect(g.xyToPosition(2, 1)).toEqual(5)
    expect(g.xyToPosition(0, 2)).toEqual(6)
    expect(g.xyToPosition(1, 2)).toEqual(7)
    expect(g.xyToPosition(2, 2)).toEqual(8)
  })

})
