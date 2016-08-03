'use strict'

const express = require('express')
const app = express()
const path = require('path')

const router = express.Router();

const pug = require('pug')

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

app.get('/foo', function(req, res) {
  res.send('BAR')
})