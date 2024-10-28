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
SELECT u_name
FROM c_user
WHERE id IN (
    SELECT user_id
    FROM c_liked
    JOIN post ON post_id = id
    JOIN c_user AS creator_user ON created_by = creator_user.id
    WHERE age < 25
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
