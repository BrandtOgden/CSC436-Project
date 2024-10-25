/*
This file will populate the various tables with dummy values
Probably going to want to use ChatGPT to generate this data in some form
*/

-- creates view

-- CREATE VIEW event_details AS
-- SELECT p.id AS post_id, p.title, p.p_description, e.location, e.e_time, u.u_name AS created_by
-- FROM c_event e
-- JOIN post p ON e.post_id = p.id
-- JOIN c_user u ON p.created_by = u.id;

-- looks at view
-- SELECT * FROM event_details;


-- Populating the c_user table with some fake users
INSERT INTO c_user (id, u_name, age, pronouns, ability, date_of_birth) VALUES
(1, 'Alex Smith', 25, 'they/them', 'Intermediate', '1999-08-15'),
(2, 'Jordan Lee', 30, 'he/him', 'Advanced', '1994-05-22'),
(3, 'Taylor Green', 22, 'she/her', 'Beginner', '2002-11-30'),
(4, 'Casey White', 27, 'they/them', 'Expert', '1997-01-19'),
(5, 'Morgan Brown', 29, 'she/her', 'Intermediate', '1995-03-12'),
(6, 'Riley Black', 35, 'he/him', 'Expert', '1989-07-04'),
(7, 'Jamie Blue', 24, 'they/them', 'Beginner', '2000-12-01'),
(8, 'Sam White', 31, 'he/him', 'Advanced', '1993-06-21'),
(9, 'Charlie Red', 28, 'she/her', 'Intermediate', '1996-02-14'),
(10, 'Robin Grey', 33, 'he/him', 'Expert', '1991-09-05');

-- Populating the post table with some fake posts
INSERT INTO post (id, title, p_description, picture_url, created_by) VALUES
(1, 'Climbing Techniques', 'A guide to getting started with climbing techniques.', 'https://example.com/image1.jpg', 1),
(2, 'Advanced Bouldering', 'Tips for advanced climbers to improve their bouldering skills.', 'https://example.com/image2.jpg', 2),
(3, 'Climbing Meetup', 'Join us for our next climbing meetup!', 'https://example.com/image3.jpg', 3),
(4, 'Best Gyms', 'A list of recommended gyms for climbing training.', 'https://example.com/image4.jpg', 1),
(5, 'Climber Nutrition', 'Best nutrition practices to improve climbing performance.', 'https://example.com/image5.jpg', 4),
(6, 'Overcoming Fear', 'Learn how to stay calm and focused during challenging climbs.', 'https://example.com/image6.jpg', 5),
(7, 'Community Day', 'A community event for climbers of all levels.', 'https://example.com/image7.jpg', 6),
(8, 'Training Regimen', 'How to create an effective training regimen for new climbers.', 'https://example.com/image8.jpg', 7),
(9, 'Safety Tips', 'Important safety measures to keep in mind while climbing.', 'https://example.com/image9.jpg', 8),
(10, 'Indoor vs Outdoor', 'Pros and cons of indoor versus outdoor climbing.', 'https://example.com/image10.jpg', 9);

-- Populating the c_event table with some events based on posts
INSERT INTO c_event (id, location, e_time, post_id) VALUES
(1, 'Boulder Gym', '2024-11-02 10:00:00', 3),
(2, 'Community Park Wall', '2024-11-10 09:00:00', 7),
(3, 'Downtown Center', '2024-11-15 14:00:00', 8),
(4, 'Mountain Peak Gym', '2024-11-20 16:00:00', 10);

-- Populating the friend table with some fake friendships
INSERT INTO friend (requested_id, accepted_id, date_accepted) VALUES
(1, 2, '2024-09-15 18:00:00'),
(2, 3, '2024-09-20 11:00:00'),
(3, 4, '2024-09-25 15:30:00'),
(4, 5, '2024-09-30 17:45:00'),
(5, 6, '2024-10-01 14:20:00'),
(6, 7, '2024-10-03 13:10:00'),
(7, 8, '2024-10-05 10:00:00'),
(8, 1, '2024-10-07 12:00:00'),
(9, 10, '2024-10-09 11:30:00'),
(10, 1, '2024-10-11 14:45:00');

-- Populating the climb_information table with some fake climbs
INSERT INTO climb_information (id, c_name, c_description, grade, location) VALUES
(1, 'Boulder Challenge', 'A challenging boulder problem with overhangs.', 5.12, 'Boulder Gym'),
(2, 'The Crack', 'A crack climb that tests hand jams.', 5.10, 'Mountain Peak'),
(3, 'Slab Master', 'A slab climb that requires careful footwork.', 5.8, 'Downtown Climbing Center'),
(4, 'Roof Traverse', 'A roof climb with a challenging traverse.', 5.13, 'Community Park Climbing Wall');

-- Populating the climbed table to record user climbs
INSERT INTO climbed (c_user_id, climb_information_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 1),
(6, 2),
(7, 3),
(8, 4),
(9, 1),
(10, 2);

-- Populating the workout table with some fake workouts
INSERT INTO workout (id, w_name, w_description, post_id) VALUES
(1, 'Endurance Training', 'A 60-minute endurance workout to improve stamina.', 4),
(2, 'Strength Training', 'A 45-minute strength workout for upper body.', 5),
(3, 'Flexibility Routine', 'A 30-minute stretching routine for flexibility.', 6),
(4, 'Power Climbing', 'A 50-minute workout focused on explosive power.', 7);

-- Populating the c_liked table with some likes on posts
INSERT INTO c_liked (user_id, post_id, time_liked) VALUES
(1, 2, '2024-10-01 10:00:00'),
(2, 3, '2024-10-02 11:30:00'),
(3, 4, '2024-10-03 12:45:00'),
(4, 5, '2024-10-04 13:00:00'),
(5, 6, '2024-10-05 14:20:00'),
(6, 7, '2024-10-06 15:30:00'),
(7, 8, '2024-10-07 16:45:00'),
(8, 9, '2024-10-08 17:10:00'),
(9, 10, '2024-10-09 18:00:00'),
(10, 1, '2024-10-10 19:15:00');

-- Populating the achievement table with some achievements
INSERT INTO acheivement (a_name) VALUES
('First Climb'),
('Endurance Champion'),
('Crack Master'),
('Slab Expert');

-- Populating the has_achievement table to record user achievements
INSERT INTO has_acheivement (user_id, a_name) VALUES
(1, 'First Climb'),
(2, 'Endurance Champion'),
(3, 'Crack Master'),
(4, 'Slab Expert'),
(5, 'First Climb'),
(6, 'Endurance Champion'),
(7, 'Crack Master'),
(8, 'Slab Expert'),
(9, 'First Climb'),
(10, 'Endurance Champion');

