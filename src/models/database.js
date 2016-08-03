var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/go-game-development';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE games(id SERIAL PRIMARY KEY, board VARCHAR(90) not null, active BOOLEAN)');
query.on('end', function() { client.end(); });