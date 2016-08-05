const bluebird = require('bluebird')
const options = {
    promiseLib: bluebird // overriding the default (ES6 Promise);
}
const pgp = require('pg-promise')(options)
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'go-bison'
}

var db = pgp(connection)

function sql(file) {
  return new pgp.QueryFile(file, {minify: true})
}

var sqlInit = sql('./db.sql')

const query = (string) => {
  db.any(string)
  .then(data => {
    // console.log('data', data)
    return data
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error); // print error;
  })
  .finally(pgp.end())
}

query('SELECT * FROM games;')

export { bluebird, pgp, db, query }