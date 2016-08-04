'use strict'

const game = require('./models/game')

const express = require('express')
const app = express()
const path = require('path')
const router = express.Router();
const pug = require('pug')
import { db, pgp } from './models/initializeDatabase'
import { retrieveAllGames } from './models/game'

app.set('port', (process.env.PORT || 3000))

app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
  db.one(
    "INSERT INTO games(board, active) VALUES ($1, $2) RETURNING id",
    ['.................................................................................', true]
  )
  .then(function (data) {
    res.render('index', {
      welcome: 'Welcome to the Go Peace game.',
      title: 'Game iD ' + data.id,
      message: 'Click to place Black or White piece.',
      board: '.................................................................................'.split('')
    })
  })
  .catch(function (error) {
      console.log("ERROR:", error.message || error); // print error;
  })
  .finally(pgp.end());
});

app.put('/games/:id/update/:board', function(req, res) {
  let board = req.params.board
  let id = req.params.id
  console.log('req.params.id', req.params.id)

  let queryString = "UPDATE games SET board='" + board + "' WHERE id=" + id + ';'
  console.log('queryString', queryString)

  db.any(queryString)
  .then(data => {
    console.log('data has been changed', data)
  })
  .catch((error) => {
    console.log("ERRORX:", error.message || error); // print error;
  })
  .finally(pgp.end())
})

app.get('/games', function(req, res) {
  db.any('SELECT * FROM games;')
  .then(data => {
    console.log('data', data)
    res.render('games', {
      title: 'Here are available games.',
      message: 'Please click below on a Game iD in order to play.',
      games: data
    })
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error); // print error;
  })
  .finally(pgp.end())
})

app.get('/games/:id', function(req, res) {
  db.one('SELECT * FROM games WHERE id=' + req.params.id + ';')
  .then(data => {
    res.render('index', {
      gameId: data.id,
      title: 'Game iD ',
      message: 'Click on a square to add your Black or White piece.',
      board: data.board.split('')
    })
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error); // print error;
  })
  .finally(pgp.end())
})

app.delete('games/:id', function(req, res) {
  console.log('Will delete game #', req.params.id)
})

const inRowsOf = (str, size) => {
  [...Array(size).keys()].map(k => str.splice(k * 9, 9)).join('\n')
}