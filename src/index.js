'use strict'

const express = require('express')
const app = express()
const path = require('path')

const router = express.Router();
const pg = require('pg');
const connectionString = require(path.join(__dirname, '../', '../', './config'));


app.set('port', (process.env.PORT || 3000))

app.use(
  express.static(path.join(__dirname, '/public'))
)

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3000!')
})

router.post('/games', function(req, res) {
    let results = []

    // Grab data from http request
    let data = {board: req.body.text, active: true}

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
          done()
          console.log(err)
          return res.status(500).json({ success: false, data: err})
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO games(board, active) values($1, $2)", [data.board, data.active])

        // SQL Query > Select Data
        let query = client.query("SELECT * FROM games ORDER BY id ASC")

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row)
        })

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done()
            return res.json(results)
        })
    })
})