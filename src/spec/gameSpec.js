import { Game } from '../models/game'

describe('Game Class', () => {
  it('checks that new game gets initialized correctly', () => {
    expect(new Game(4).board.length).toEqual(16)
    expect(new Game(9).board.length).toEqual(81)
  })

  it('#place works', () => {
    let g = new Game(2)
    expect(g.board).toEqual('....')

    expect(g.place(2)).toEqual(true)
    expect(g.board).toEqual('..B.')
    expect(g.moveStack).toEqual([2])

    expect(g.occupied(2)).toEqual(true)
    expect(g.place(2)).toEqual(false)
    expect(g.moveStack).toEqual([2])

    expect(g.place(1)).toEqual(true)
    expect(g.board).toEqual('.WB.')
    expect(g.moveStack).toEqual([2, 1])
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

  it('#nextPlayer() works', () => {
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

  it('#neighbors works', () => {
    let g = new Game(3)
    g.board = '.WBW.WBWB'
    expect(g.neighbors(4)).toEqual(['W', 'W', 'W', 'W'])
  })  

  it('#freedoms works', () => {
    let g = new Game(3)
    g.board = '.WBW.WBWB'
    expect(g.freedoms(0, 'W')).toEqual(2)
    expect(g.freedoms(0, 'B')).toEqual(0)
    expect(g.freedoms(1, 'W')).toEqual(2)
    expect(g.freedoms(1, 'B')).toEqual(3)
    expect(g.freedoms(4, 'W')).toEqual(4)
    expect(g.freedoms(4, 'B')).toEqual(0)
  })

  it('#suicide works when true', () => {
    let g = new Game(4) // x 2 y 1 position 6
    g.board = '..W..W.W..W.....'
    expect(g.freedoms(6, g.nextPlayer())).toEqual(0)
    expect(g.suicide(6)).toEqual(true)
    expect(g.place(6)).toEqual(false)
  })

  it('#suicide works for false', () => {
    let g = new Game(15) // bottom right corner
    g.board = '..W..W.W..W.....'
    expect(g.freedoms(15, g.nextPlayer())).toEqual(2)
    expect(g.suicide(15)).toEqual(false)
    expect(g.place(15)).toEqual(true)
  })

  it('#ko works', () => {
    let g = new Game(4)
    g.board = '................'
  })
})
