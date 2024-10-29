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
-- Find users who liked posts created by users younger than 25
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
SELECT u_name, location, e_time
FROM c_user
LEFT OUTER JOIN c_event ON c_user.id = c_event.post_id;

-- Views
-- Create a view that shows all posts with their associated likes
CREATE VIEW PostLikes AS
SELECT title, COUNT(user_id) AS total_likes
FROM post
LEFT JOIN c_liked ON post.id = c_liked.post_id
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

