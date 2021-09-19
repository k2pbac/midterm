-- Drop and recreate Submissions table

DROP TABLE IF EXISTS submissions CASCADE;
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  voter_id INTEGER REFERENCES voter(id) ON DELETE CASCADE,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  points_choice_1 VARCHAR(255) NOT NULL,
  points_choice_2 VARCHAR(255) NOT NULL,
  points_choice_3 VARCHAR(255),
  points_choice_4 VARCHAR(255),
);
