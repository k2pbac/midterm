-- Users table seeds here (Example)

INSERT INTO users (name, email) VALUES ('Alice', 'alice@email.com');
INSERT INTO users (name, email) VALUES ('Kira', 'kira@email.com');
INSERT INTO users (name, email) VALUES ('Michael', 'b@b.com');
INSERT INTO users (name, email) VALUES ('James', 'jamesa@gmail.com');
INSERT INTO users (email) VALUES ('jsa@gmail.com');


INSERT INTO polls ( title, description, creator_id, shared_link, results_link, is_active ) VALUES ('Where to hold conference', 'Location to hold LHLExpo', 1, 'www.example.com', 'www.example.com', TRUE);
INSERT INTO polls ( title, description, creator_id, shared_link, results_link, is_active ) VALUES ('Movie vote', 'Voting to see Friday night', 3, 'www.example.com', 'www.example.com', TRUE);
INSERT INTO polls ( title, description, creator_id, shared_link, results_link, is_active ) VALUES ('Next book to read', 'Voting to see what book to read in a bookclub', 4, 'www.example.com', 'www.example.com', TRUE);

INSERT INTO options (option, option_info, poll_id) VALUES ('Toronto', 'description', 1);
INSERT INTO options (option, option_info, poll_id) VALUES ('Ottawa', 'description', 1);
INSERT INTO options (option, option_info, poll_id) VALUES ('Hamilton', 'description', 1);
INSERT INTO options (option, option_info, poll_id) VALUES ('Venom', 'description', 2);
INSERT INTO options (option, option_info, poll_id) VALUES ('Harry Potter', 'description', 2);
INSERT INTO options (option, option_info, poll_id) VALUES ('Avengers', 'description', 2);
INSERT INTO options (option, option_info, poll_id) VALUES ('Rush Hour', 'description', 2);
INSERT INTO options (option, option_info, poll_id) VALUES ('Game of Thrones', 'description', 3);
INSERT INTO options (option, option_info, poll_id) VALUES ('Green Eggs and Ham', 'description', 3);


INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (1, 1, 3, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (1, 2, 1, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (1, 3, 2, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (5, 1, 3, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (5, 2, 1, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (5, 3, 2, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (2, 3, 1, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (2, 2, 3, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (2, 1, 2, 1);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (3, 4, 1, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (3, 5, 4, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (3, 6, 3, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (3, 7, 2, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (1, 4, 4, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (1, 5, 2, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (1, 6, 1, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (1, 7, 3, 2);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (4, 8, 1, 3);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (4, 9, 2, 3);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (2, 8, 1, 3);
INSERT INTO results (voter_id, option_id, point, poll_id) VALUES (2, 9, 2, 3);
