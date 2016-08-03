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
    ['.........', true]
  )
  .then(function (data) {
    res.render('index', {
      title: 'Game #' + data.id,
      message: 'Click to place X or O',
      board: '.........'.split('')
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
  db.any("UPDATE games SET board='" + board + "' WHERE id=" + id + ';')
  .then(data => {
    console.log('data has been changed', data)    
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error); // print error;
  })
  .finally(pgp.end())
})

app.get('/games', function(req, res) {
  db.any('SELECT * FROM games;')
  .then(data => {
    console.log('data', data)
    res.render('games', {
      title: 'All Games',
      message: 'Clicking on individual games: coming soon!',
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
      title: 'Game #' + data.id,
      message: 'Click to place X or O',
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