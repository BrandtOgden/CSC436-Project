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

-- Populating the c_user table with users
INSERT INTO c_user (u_name, pronouns, ability, date_of_birth) VALUES
('Alex Smith', 'they/them', 'Intermediate', '1999-08-15'),
('Jamie Lee', 'she/her', 'Advanced', '1995-05-20'),
('Chris Tan', 'he/him', 'Beginner', '2002-03-11'),
('Taylor Green', 'they/them', 'Expert', '1994-01-22'),
('Jordan Brown', 'he/him', 'Advanced', '1996-12-04'),
('Morgan Gray', 'she/her', 'Intermediate', '1993-02-17'),
('Casey Young', 'they/them', 'Advanced', '2000-06-30'),
('Drew Kim', 'he/him', 'Beginner', '2005-11-09'),
('Avery Parker', 'she/her', 'Expert', '1990-01-25'),
('Jordan White', 'they/them', 'Intermediate', '1998-09-17'),
('Blake Anderson', 'he/him', 'Advanced', '1995-05-13'),
('Dana Cooper', 'she/her', 'Expert', '1991-12-02'),
('Robin Turner', 'they/them', 'Intermediate', '2003-03-20'),
('Riley Murphy', 'she/her', 'Beginner', '1997-10-18'),
('Peyton Scott', 'he/him', 'Advanced', '1994-07-12'),
('Elliot Reed', 'they/them', 'Beginner', '2002-04-28'),
('Charlie Bell', 'he/him', 'Expert', '1989-08-04'),
('Jordan Lane', 'she/her', 'Intermediate', '2001-02-14'),
('Taylor Hughes', 'they/them', 'Advanced', '1996-09-01'),
('Bailey Carter', 'he/him', 'Beginner', '1999-11-05'),
('Jamie Fisher', 'she/her', 'Expert', '1992-05-16'),
('Cameron Ward', 'they/them', 'Intermediate', '1998-03-22'),
('Alexis Diaz', 'he/him', 'Advanced', '1995-07-19'),
('Shawn Brooks', 'she/her', 'Beginner', '1997-12-15'),
('Taylor Evans', 'he/him', 'Expert', '1994-06-02'),
('Jordan Rivera', 'they/them', 'Intermediate', '2000-01-09'),
('Quinn Hayes', 'she/her', 'Advanced', '1991-11-29'),
('Logan Martinez', 'he/him', 'Beginner', '2003-10-08'),
('Morgan Kelly', 'they/them', 'Expert', '1990-05-22'),
('Riley King', 'he/him', 'Intermediate', '2001-08-03'),
('Sydney Price', 'she/her', 'Advanced', '1996-02-15'),
('Corey Ramirez', 'they/them', 'Beginner', '1998-04-11'),
('Emerson Scott', 'he/him', 'Expert', '1994-12-23'),
('Parker Simmons', 'she/her', 'Intermediate', '2002-07-20'),
('Sasha Torres', 'they/them', 'Advanced', '1995-03-09'),
('Dylan Bennett', 'he/him', 'Beginner', '1993-06-18'),
('Finley Wood', 'she/her', 'Expert', '1999-09-21'),
('River Thomas', 'they/them', 'Intermediate', '1997-11-13'),
('Jamie Powell', 'he/him', 'Advanced', '1994-05-07'),
('Alex Morgan', 'she/her', 'Beginner', '2001-12-01'),
('Kendall Miller', 'they/them', 'Expert', '1996-04-19'),
('Shannon Collins', 'he/him', 'Intermediate', '2003-03-31'),
('Blair Sanchez', 'she/her', 'Advanced', '1998-10-16'),
('Hunter Rogers', 'they/them', 'Beginner', '1992-07-14'),
('Kerry Russell', 'he/him', 'Expert', '1990-02-08'),
('Reese Phillips', 'she/her', 'Intermediate', '2000-08-28'),
('Payton Barnes', 'they/them', 'Advanced', '1991-11-11'),
('Jessie Lee', 'he/him', 'Beginner', '2004-10-05'),
('Blake Fox', 'she/her', 'Expert', '1995-01-29'),
('Jordan Foster', 'they/them', 'Intermediate', '1997-05-25');


-- Populating the achievement table with some achievements
INSERT INTO achievement (a_name) VALUES
('First Climb'),
('100th Climb'),
('Lead Climb Pro'),
('Bouldering Enthusiast'),
('Top Rope Specialist'),
('Speed Climber'),
('Outdoor Climber');

-- Populating the climb_information table with some fake climbs
INSERT INTO climb_information (id, c_name, c_description, grade, location) VALUES
(1, 'Boulder Challenge', 'A challenging boulder problem with overhangs.', 5.12, 'Boulder Gym'),
(2, 'The Slab Master', 'Slab wall requiring careful foot placement.', 5.10, 'City Climb Center'),
(3, 'Roof of Fury', 'Overhang climb with a tough roof section.', 5.13, 'High Rock Gym'),
(4, 'Endurance Wall', 'Long endurance climb with technical moves.', 5.9, 'Rock Ridge'),
(5, 'Technical Terrors', 'Requires precision on small holds.', 5.11, 'Edge Climbing Gym'),
(6, 'Vertical Sprint', 'Short and fast climb with explosive moves.', 5.8, 'Basecamp Boulder'),
(7, 'The Crux', 'Tough crux section near the top.', 5.12, 'Gravity Zone'),
(8, 'Overhang Odyssey', 'Steep climb with powerful moves.', 5.13, 'Peak Performance');

-- Populating the post table with some fake posts
INSERT INTO post (id, title, p_description, picture_url, created_by) VALUES
(1, 'Climbing Techniques', 'A guide to getting started with climbing techniques.', 'https://example.com/image1.jpg', 1),
(2, 'Advanced Bouldering', 'Tips for advanced climbers to improve their bouldering skills.', 'https://example.com/image2.jpg', 2),
(3, 'Beginner’s Guide', 'Everything a beginner climber needs to know.', 'https://example.com/image3.jpg', 3),
(4, 'Nutrition for Climbers', 'How to fuel your body for the best performance.', 'https://example.com/image4.jpg', 4),
(5, 'Mental Toughness', 'Building the mindset to overcome climbing challenges.', 'https://example.com/image5.jpg', 5),
(6, 'Gear Essentials', 'Must-have gear for climbing safely.', 'https://example.com/image6.jpg', 6),
(7, 'Training for Endurance', 'A workout plan to build climbing endurance.', 'https://example.com/image7.jpg', 7),
(8, 'Finding Climbing Routes', 'Tips on finding the best outdoor routes.', 'https://example.com/image8.jpg', 8),
(9, 'How to Overcome Fear of Heights', 'Mental tips for overcoming fear.', 'https://example.com/image9.jpg', 9),
(10, 'Strength Training for Climbers', 'Exercises to build power for climbing.', 'https://example.com/image10.jpg', 10);

-- Populating the c_event table with some events based on posts
INSERT INTO c_event (id, location, e_time, post_id) VALUES
(1, 'Boulder Gym', '2024-11-02 10:00:00', 3),
(2, 'City Climb Center', '2024-11-05 15:00:00', 1),
(3, 'High Rock Gym', '2024-11-10 18:00:00', 2),
(4, 'Rock Ridge', '2024-12-01 09:00:00', 4),
(5, 'Edge Climbing Gym', '2024-12-08 17:30:00', 5),
(6, 'Peak Performance', '2024-12-15 13:00:00', 6),
(7, 'Gravity Zone', '2025-01-05 11:00:00', 7),
(8, 'Basecamp Boulder', '2025-01-12 16:00:00', 8);

-- Populating the c_liked table with some likes on posts
INSERT INTO c_liked (user_id, post_id, time_liked) VALUES
(1, 2, '2024-10-01 10:00:00'),
(2, 1, '2024-10-02 12:00:00'),
(3, 4, '2024-10-02 14:30:00'),
(4, 3, '2024-10-03 11:00:00'),
(5, 5, '2024-10-03 16:00:00'),
(6, 4, '2024-10-04 18:00:00'),
(7, 5, '2024-10-05 19:00:00'),
(8, 2, '2024-10-06 10:00:00'),
(9, 1, '2024-10-06 13:00:00'),
(10, 3, '2024-10-06 17:00:00'),
(5, 7, '2024-10-10 13:00:00'),
(8, 6, '2024-10-12 15:30:00'),
(2, 8, '2024-10-15 18:20:00'),
(4, 9, '2024-10-16 12:45:00');

-- Populating the climbed table to record user climbs
INSERT INTO climbed (c_user_id, climb_information_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(1, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 7),
(6, 8),
(9, 1),
(10, 2);

-- Populating the friend table with some fake friendships
INSERT INTO friend (requested_id, accepted_id, date_accepted) VALUES
(1, 2, '2024-09-15 18:00:00'),
(2, 3, '2024-09-20 10:00:00'),
(3, 4, '2024-09-25 14:00:00'),
(4, 5, '2024-10-01 08:00:00'),
(5, 6, '2024-10-05 20:00:00'),
(6, 7, '2024-10-10 15:00:00'),
(7, 8, '2024-10-12 09:30:00'),
(8, 9, '2024-10-15 11:30:00'),
(9, 10, '2024-10-17 14:00:00'),
(1, 10, '2024-10-20 13:00:00');

-- Populating the has_achievement table to record user achievements
INSERT INTO has_achievement (user_id, a_name) VALUES
(1, 'First Climb'),
(2, '100th Climb'),
(3, 'Lead Climb Pro'),
(4, 'Bouldering Enthusiast'),
(5, 'Top Rope Specialist'),
(6, 'Speed Climber'),
(7, 'Outdoor Climber'),
(8, 'First Climb'),
(9, 'Bouldering Enthusiast'),
(10, 'Lead Climb Pro');

-- Populating the workout table with some fake workouts
INSERT INTO workout (id, w_name, w_description, post_id) VALUES
(1, 'Endurance Training', 'A 60-minute endurance workout to improve stamina.', 4),
(2, 'Core Strength Circuit', 'Intense core training for improved stability.', 5),
(3, 'Finger Strength Workout', 'Workout focused on building finger strength.', 3),
(4, 'Leg Power Boost', 'Exercises to improve leg power and agility.', 1),
(5, 'Upper Body Power', 'Workout focused on building upper body strength.', 2),
(6, 'Dynamic Stretching', 'Pre-climb stretching routine.', 6),
(7, 'Explosive Power Training', 'Training for powerful climbing moves.', 7),
(8, 'Mental Focus Drills', 'Exercises to build mental resilience.', 8);






