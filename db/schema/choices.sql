-- Drop and recreate Choices table

DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  choice_a VARCHAR(255) NOT NULL,
  choice_a_info TEXT NOT NULL,
  choice_b VARCHAR(255) NOT NULL,
  choice_b_info TEXT NOT NULL,
  choice_c VARCHAR(255) NOT NULL,
  choice_c_info TEXT NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
);
