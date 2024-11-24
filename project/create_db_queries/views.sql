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
        u2.username, date_accepted, requested_id
    FROM
        friend
	JOIN
        c_user u1 ON u1.id = requested_id
	JOIN
        c_user u2 ON u2.id = accepted_id
    ORDER BY friend.date_accepted;
    