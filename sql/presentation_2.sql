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

-- Nested Subquery Example
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

-- Nested Subquery

-- Outer Join
-- Show all users and any events they've created, including users who haven't created events
SELECT u.u_name, e.location, e.e_time
FROM c_user u
LEFT OUTER JOIN c_event e ON u.id = e.post_id;

-- Views
