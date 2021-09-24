-- Drop and recreate Polls table

DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  shared_link VARCHAR(255),
  results_link VARCHAR(255),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  max_submission INTEGER DEFAULT 100
);
