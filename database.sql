CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
);


CREATE TABLE stories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  profile_picture VARCHAR(250),
  title TEXT NOT NULL,
  body TEXT NOT NULL, 
  category_id INTEGER NOT NULL REFERENCES categories(id),
  likes INTEGER,
  loves INTEGER,
  claps INTEGER
);


CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  story_id INTEGER NOT NULL REFERENCES stories(id),
  body TEXT NOT NULL
);


SELECT * FROM users WHERE id = 1;

SELECT * FROM users;

SELECT id FROM users;



SELECT stories.*, users.username, users.profile_picture
                       FROM stories
                       JOIN users ON stories.user_id = users.id