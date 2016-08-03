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
    "insert into games(board, active) VALUES ($1, $2) RETURNING id",
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

app.post('/games/update', function(req, res) {
  console.log('req.body', req.body)
  // console.log('req.body.board', req.body.board)
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