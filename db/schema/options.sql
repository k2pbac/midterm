-- Drop and recreate Choices table

DROP TABLE IF EXISTS options CASCADE;
CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  option VARCHAR(255) NOT NULL,
  option_info TEXT NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE
);
