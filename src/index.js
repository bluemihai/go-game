'use strict'

const game = require('./models/game')

const express = require('express')
const app = express()
const path = require('path')
const router = express.Router();
const pug = require('pug')
import { db, pgp } from './models/initializeDatabase'

app.set('port', (process.env.PORT || 3000))

app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Go (Simple)',
    message: 'Hello there!',
    board: ['A', '.', '.', 'O', 'X', 'O', '.', '.', '.']
  });
});

app.get('/games/create', function(req, res) {
  db.one("insert into games(board, active) VALUES ($1, $2) RETURNING id", ['', true])
    .then(function (data) {
        res.send('newGameId is... ' + data.id)
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error); // print error;
    })
    .finally(pgp.end());
})

