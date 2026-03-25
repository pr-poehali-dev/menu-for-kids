CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);