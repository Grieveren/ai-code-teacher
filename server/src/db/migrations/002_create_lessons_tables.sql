CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lesson_exercises (
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  exercise_id INTEGER REFERENCES exercises(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  PRIMARY KEY (lesson_id, exercise_id)
);

INSERT INTO lessons (title, description) VALUES
  ('Intro to JavaScript', 'Basics of JavaScript language');

INSERT INTO lesson_exercises (lesson_id, exercise_id, order_index)
SELECT 1, id, ROW_NUMBER() OVER () FROM exercises LIMIT 1;
