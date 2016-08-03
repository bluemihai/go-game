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
  })

  it('refuses to place if location already occupied', () => {
    let g = new Game(2)
    g.board = 'XOXO'
    expect(g.board).toEqual('XOXO')
    let result = g.place(2)
    expect(g.board).toEqual('XOXO')
  })
})
