/* 
This file will be used for the second project presentation
All of the different queries we will show will be here
*/

-- Drop 
DROP TABLE IF EXISTS has_achievement;

-- Alter
SELECT * FROM c_user;

ALTER TABLE c_user 
ADD email VARCHAR(50);

-- Delete
SELECT * FROM c_user;
SELECT * FROM post 
WHERE created_by = 3;

DELETE FROM c_user
WHERE id = 3;

-- Update
SELECT id,u_name, pronouns
FROM c_user
WHERE id = 2;

UPDATE c_user
SET pronouns = 'they/them'
WHERE id = 2;

-- Special Queries

-- Nested Subquery
-- Find users who liked posts created by users younger than 25. Dot notation used because id is ambigous
-- This query pulls u_name from c_user where the id matches any user_id returned by the inner query. 
-- (It’s looking for users whose id appears in the subset of user IDs satisfying the criteria in the inner query.)

SELECT u_name
FROM c_user
WHERE id IN (
    SELECT user_id
    FROM c_liked
    JOIN post ON post.id = user_id
    JOIN c_user ON created_by = user_id
    WHERE TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) < 25
);


-- Outer Join
-- Show all users and any events they've created, including users who haven't created events
-- A LEFT OUTER JOIN means that all rows from the c_user table will be included in the result, even if there is no matching row in the c_event table.
-- For rows where there is no match in c_event (i.e., no event associated with a particular user), the columns location and e_time from c_event will return NULL.
SELECT u_name, location, e_time
FROM c_user
-- dot notation used because id is used as the same name in multiple tables
LEFT OUTER JOIN c_event ON c_user.id = post_id;

-- Views
-- Create a view that shows all posts with their associated likes
CREATE VIEW PostLikes AS
SELECT title, COUNT(user_id)
FROM post
LEFT JOIN c_liked ON post.id = post_id
GROUP BY title;

SELECT 
    *
FROM
    PostLikes;

-- delete the view
DROP VIEW PostLikes;

--add column name
CREATE VIEW PostLikes AS
SELECT title, COUNT(user_id) as Total_Likes
FROM post
LEFT JOIN c_liked ON post.id = .post_id
GROUP BY title;

SELECT * FROM PostLikes;

-- Index Example
-- Create an index on the date_accepted column in the friend table for faster lookups
CREATE INDEX idx_friend_date ON friend(date_accepted);

-- Check Constraint Example
-- Ensure that users abilities are one of 4 options
ALTER TABLE c_user
ADD CONSTRAINT chk_ability 
CHECK (ability IN ('Beginner', 'Intermediate', 'Advanced', 'Expert'));

-- Unique Constraint Example
-- Enforce unique achievement names in the acheivement table
ALTER TABLE achievement
ADD CONSTRAINT unique_achievement_name UNIQUE (a_name);

