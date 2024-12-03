/*
	This is the SQL we used to demonstrate our interface working with the database
*/

USE Climbing;

SELECT * FROM c_user;

-- Posts
SELECT * FROM post;
SELECT * FROM recent_posts;

-- Climbs
SELECT * FROM climb_information;
SELECT * FROM climbed;
SELECT * FROM get_climbs WHERE c_user_id = 55;

-- Friends
SELECT * FROM friend;
SELECT * FROM get_friends WHERE requested_id = 55;

-- Settings
SELECT * FROM c_user WHERE id = 55;