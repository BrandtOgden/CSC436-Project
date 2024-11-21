/*
This files holds all of the views that are created for this project
*/
use Climbing;

-- View that gets the 10 most recent posts
CREATE VIEW recent_posts AS
SELECT 
	post.id as post_id,
    title,
    p_description as post_description,
    image_url,
    date_created,
    username AS created_by
FROM 
	post
INNER JOIN
	c_user ON c_user.id = post.created_by
ORDER BY
	post.date_created DESC
LIMIT 10;
    