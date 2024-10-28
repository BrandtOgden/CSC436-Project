/* 
This file will be used for the second project presentation
All of the different queries we will show will be here
*/

-- Create (will be done in create.sql)

-- Drop 
DROP TABLE IF EXISTS has_acheivement;

-- Alter
ALTER TABLE c_user 
ADD email VARCHAR(50);

-- Insert (will be done in populate.sql)

-- Delete

-- Update

-- Select 

-- Special Queries

-- Nested Subquery
-- Find users who liked posts created by users younger than 25
SELECT u.u_name
FROM c_user u
WHERE u.id IN (
    SELECT l.user_id
    FROM c_liked l
    JOIN post p ON l.post_id = p.id
    JOIN c_user u2 ON p.created_by = u2.id
    WHERE u2.age < 25
);


-- Outer Join
-- Show all users and any events they've created, including users who haven't created events
SELECT u.u_name, e.location, e.e_time
FROM c_user u
LEFT OUTER JOIN c_event e ON u.id = e.post_id;

-- Views
-- Create a view that shows all posts with their associated likes
CREATE VIEW PostLikes AS
SELECT p.title, p.p_description, COUNT(l.user_id) AS total_likes
FROM post p
LEFT JOIN c_liked l ON p.id = l.post_id
GROUP BY p.title, p.p_description;

-- Index Example
-- Create an index on the date_accepted column in the friend table for faster lookups
CREATE INDEX idx_friend_date ON friend(date_accepted);


-- Check Constraint Example
-- Ensure that users must be at least 18 years old when added to the database
ALTER TABLE c_user
ADD CONSTRAINT chk_user_age CHECK (age >= 18);

-- Unique Constraint Example
-- Enforce unique achievement names in the acheivement table
ALTER TABLE acheivement
ADD CONSTRAINT unique_acheivement_name UNIQUE (a_name);

-- Trigger Example
-- Automatically update post timestamps whenever the post is updated
CREATE TRIGGER update_post_time
BEFORE UPDATE ON post
FOR EACH ROW
SET NEW.updated_at = NOW();
