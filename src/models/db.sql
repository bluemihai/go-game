DROP TABLE IF EXISTS games;
CREATE TABLE games(
  id SERIAL PRIMARY KEY,
  board VARCHAR(90) not null,
  active BOOLEAN
);
INSERT INTO games (board, active)
  VALUES ('.................................................................................', true)
  RETURNING id;
