-- Drop and recreate Results table

DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  point INTEGER,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  voter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE
);
