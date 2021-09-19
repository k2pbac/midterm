-- Drop and recreate Results table

DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  choice_a_points INTEGER,
  choice_b_points INTEGER,
  choice_c_points INTEGER,
  choice_id INTEGER REFERENCES choices(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
);
