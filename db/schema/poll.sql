-- Drop and recreate Polls table

DROP TABLE IF EXISTS poll CASCADE;
CREATE TABLE poll (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  choice_id INTEGER REFERENCES choices(id) ON DELETE CASCADE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);
