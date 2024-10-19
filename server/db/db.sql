CREATE TYPE role AS ENUM('Manager', 'Worker');
CREATE TYPE status AS ENUM('To Do', 'In Progress', 'Done');
CREATE TYPE priority AS ENUM('Low', 'Medium', 'High');

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  role ROLE NOT NULL,
  name VARCHAR(24) NOT NULL,
  surname VARCHAR(24) NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE teams (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  team_name VARCHAR(30)
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY NOT NULL, 
  project_name VARCHAR(30) NOT NULL,
  project_description TEXT NOT NULL,
  creator_id BIGINT NOT NULL REFERENCES users(id),
  status STATUS NOT NULL,
  priority PRIORITY NOT NULL,
  deadline DATE NOT NULL
);

CREATE TABLE user_teams (
  user_id BIGINT NOT NULL REFERENCES users(id),
  team_id BIGINT NOT NULL REFERENCES teams(id)
);

CREATE TABLE project_teams (
  project_id BIGINT NOT NULL REFERENCES projects(id),
  team_id BIGINT NOT NULL REFERENCES teams(id)
);