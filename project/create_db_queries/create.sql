/*
This file creates the database from scratch
*/

-- Used to delete the database and start over
-- DROP DATABASE Climbing;

CREATE DATABASE Climbing;
USE Climbing;

-- User that Flask uses to connect to database
-- CREATE USER 'flask'@'%' IDENTIFIED BY 'Fl@5kFl@5k!';
GRANT SELECT, INSERT, DELETE ON Climbing.* TO 'flask'@'%';
FLUSH PRIVILEGES;

CREATE TABLE c_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
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
        REFERENCES c_user (id)
        ON DELETE CASCADE,
    FOREIGN KEY (accepted_id)
        REFERENCES c_user (id)
        ON DELETE CASCADE
);

CREATE TABLE climb_information (
    id INT PRIMARY KEY AUTO_INCREMENT,
    c_name VARCHAR(30),
    c_description VARCHAR(100),
    grade NUMERIC(3 , 2 ),
    location VARCHAR(30)
);

-- For many to many relationship with user and climb_information
CREATE TABLE climbed (
    c_user_id INT,
    climb_information_id INT,
    PRIMARY KEY (c_user_id , climb_information_id),
    FOREIGN KEY (c_user_id)
        REFERENCES c_user (id)
        ON DELETE CASCADE,
    FOREIGN KEY (climb_information_id)
        REFERENCES climb_information (id)
        ON DELETE CASCADE
);

CREATE TABLE post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40),
    p_description VARCHAR(100),
    image_url VARCHAR(100),
    created_by INT,
    date_created DATETIME,
    FOREIGN KEY (created_by)
        REFERENCES c_user (id)
        ON DELETE CASCADE
);

-- Event is a subtype of post, only one event per post
CREATE TABLE c_event (
    id INT PRIMARY KEY AUTO_INCREMENT,
    location VARCHAR(30),
    e_time DATETIME,
    post_id INT UNIQUE NOT NULL,
    FOREIGN KEY (post_id)
        REFERENCES post (id)
        ON DELETE CASCADE
);

-- Making workout a subtype of post and just adding a big description instead of multivalued attribute
CREATE TABLE workout (
    id INT PRIMARY KEY AUTO_INCREMENT,
    w_name VARCHAR(30),
    w_description VARCHAR(300),
    post_id INT UNIQUE NOT NULL,
    FOREIGN KEY (post_id)
        REFERENCES post (id)
        ON DELETE CASCADE
);

CREATE TABLE c_liked (
    user_id INT,
    post_id INT,
    time_liked DATETIME,
    PRIMARY KEY (user_id , post_id),
    FOREIGN KEY (user_id)
        REFERENCES c_user (id)
        ON DELETE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES post (id)
        ON DELETE CASCADE
);

CREATE TABLE achievement (
    a_name VARCHAR(30) PRIMARY KEY
);

-- Many to many relationship between users and achievements
CREATE TABLE has_achievement (
    user_id INT,
    a_name VARCHAR(30),
    PRIMARY KEY (user_id , a_name),
    FOREIGN KEY (user_id)
        REFERENCES c_user (id)
        ON DELETE CASCADE,
    FOREIGN KEY (a_name)
        REFERENCES achievement (a_name)
        ON DELETE CASCADE
);

