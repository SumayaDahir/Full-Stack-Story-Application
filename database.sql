CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) NOT NULL UNIQUE,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "password" TEXT NOT NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"(id),
  story_id INTEGER NOT NULL REFERENCES stories(id),
  body TEXT NOT NULL
);

CREATE TABLE stories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"(id),
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