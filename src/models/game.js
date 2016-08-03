import { query } from './initializeDatabase'

const createGame = (boardString) => {
  let queryString = "INSERT INTO games (board, active) \
  VALUES ('" + boardString + "', true) \
  RETURNING id;"
  return query(queryString)
}

const retrieveGame = (gameId) => {
  let queryString = 'SELECT * FROM games WHERE id=' + gameId + ';'
  return query(queryString)
}

const retrieveAllGames = () => {
  let queryString = 'SELECT * FROM games;'
  return query(queryString)
}

const updateGame = (gameId, board) => {
  let queryString = "UPDATE games SET board='" + board + "' WHERE id=" + gameId + ';'
  return query(queryString)
}

const destroyGame = (gameId) => {
  let queryString = 'DELETE FROM games WHERE id=' + gameId + ' RETURNING board;'
  return query(queryString)
}

createGame('santhoesuntahoes')