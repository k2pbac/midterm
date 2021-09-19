-- Drop and recreate Choices table

-- Each choice has its own table

DROP TABLE IF EXISTS choices_a CASCADE;
CREATE TABLE choices_a (
  id SERIAL PRIMARY KEY NOT NULL,
  choice VARCHAR(255) NOT NULL,
  choice_info TEXT NOT NULL,
  points INTEGER,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  voter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
);

DROP TABLE IF EXISTS choices_b CASCADE;
CREATE TABLE choices_b (
  id SERIAL PRIMARY KEY NOT NULL,
  choice VARCHAR(255) NOT NULL,
  choice_info TEXT NOT NULL,
  points INTEGER,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  voter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
);
