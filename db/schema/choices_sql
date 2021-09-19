-- Drop and recreate Choices table

DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  choice_1 VARCHAR(255) NOT NULL,
  choice_1_info TEXT NOT NULL,
  choice_2 VARCHAR(255) NOT NULL,
  choice_2_info TEXT NOT NULL,
  choice_3 VARCHAR(255),
  choice_3_info TEXT,
  choice_4 VARCHAR(255),
  choice_4_info TEXT,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
);
