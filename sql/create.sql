/*
This file creates the database from scratch
*/

-- Used to delete the database and start over
-- DROP DATABASE Climbing;

CREATE DATABASE Climbing;
USE Climbing;

CREATE TABLE c_user (
    id INT PRIMARY KEY,
    u_name VARCHAR(20),
    age INT,
    pronouns VARCHAR(20),
    ability VARCHAR(20),
    date_of_birth CHAR(10)
);

-- Many to many relationship between users
CREATE TABLE friend (
    requested_id INT,
    accepted_id INT,
    date_accepted DATETIME,
    PRIMARY KEY (requested_id , accepted_id),
    FOREIGN KEY (requested_id)
        REFERENCES c_user (id),
    FOREIGN KEY (accepted_id)
        REFERENCES c_user (id)
);

CREATE TABLE climb_information (
    id INT PRIMARY KEY,
    c_name VARCHAR(30),
    grade NUMERIC(3, 2),
    location VARCHAR(30)
);

-- For many to many relationship with user and climb_information
CREATE TABLE climbed (
    c_user_id INT,
    climb_information_id INT,
    PRIMARY KEY (c_user_id , climb_information_id),
    FOREIGN KEY (c_user_id)
        REFERENCES c_user (id),
    FOREIGN KEY (climb_information_id)
        REFERENCES climb_information (id)
);

CREATE TABLE c_event (
    id INT PRIMARY KEY,
    e_name VARCHAR(30),
    location VARCHAR(30),
    e_time VARCHAR(10),
    created_by INT,
    FOREIGN KEY (created_by)
        REFERENCES c_user (id)
);

CREATE TABLE post (
    id INT PRIMARY KEY,
    title VARCHAR(20),
    p_description VARCHAR(100),
    picture_url VARCHAR(100),
    created_by INT,
    FOREIGN KEY (created_by)
        REFERENCES c_user (id)
);

-- TODO: ADD LIKE AND SHARE FOR EVENT AND POST

CREATE TABLE acheivement (
    a_name VARCHAR(30) PRIMARY KEY
);

-- Many to many relationship between users and achievements
CREATE TABLE has_acheivement (
    user_id INT,
    a_name VARCHAR(30),
    PRIMARY KEY (user_id , a_name),
    FOREIGN KEY (user_id)
        REFERENCES c_user (id),
    FOREIGN KEY (a_name)
        REFERENCES acheivement (a_name)
);

-- TODO: ADD SOME RELATIONSHIP THAT LINKS GYM WITH USER/WORKOUTS
CREATE TABLE gym (
    id INT PRIMARY KEY,
    g_name VARCHAR(30),
    address VARCHAR(30)
);

-- TODO: ADD WORKOUT/EXERCISE TABLE AND ADD COMPLETE RELATIONSHIP
