CREATE DATABASE simpler_todo

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    task VARCHAR(255)
);