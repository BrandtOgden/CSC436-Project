/*
This files holds all of the views that are created for this project
*/
use Climbing;

-- Gets the 10 most recent posts
CREATE VIEW recent_posts AS
    SELECT 
        post.id post_id,
        title,
        p_description post_description,
        image_url,
        date_created,
        username created_by
    FROM
        post
    JOIN
        c_user ON c_user.id = post.created_by
    ORDER BY post.date_created DESC
    LIMIT 10;

-- Gets all the friends of user
-- To use this set requested_id to whichever user you want to get friends of
CREATE VIEW get_friends AS
SELECT
    u2.id AS friend_id,  -- Include the friend's ID
    u2.username,         -- Include the friend's username
    friend.date_accepted,
    friend.requested_id
FROM
    friend
JOIN
    c_user u1 ON u1.id = friend.requested_id
JOIN
    c_user u2 ON u2.id = friend.accepted_id
ORDER BY
    friend.date_accepted;

    
-- Gets all of the climbs that have been completed by a user
CREATE VIEW get_climbs AS
    SELECT 
        c_user_id,
        climb_information_id,
        date_climbed,
        c_name,
        c_description,
        grade,
        location
    FROM
        climbed
    JOIN 
        climb_information on climb_information_id = climb_information.id
    ORDER BY date_climbed DESC;
        