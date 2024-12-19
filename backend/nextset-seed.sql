-- Insert Artist Users and Related Artist Information
-- Artist User 1
INSERT INTO users (username, password_hash, email, account_type)
VALUES ('artist_user_1', 'hashed_password', 'artist_user_1@example.com', 'artist');

-- Insert Artist 1
INSERT INTO artists (name, phone, email)
VALUES ('Artist One', '555-1234', 'artistone@example.com');

-- Link the User to the Artist
UPDATE users SET artist_id = (SELECT id FROM artists WHERE email = 'artistone@example.com')
WHERE username = 'artist_user_1';

-- Artist User 2
INSERT INTO users (username, password_hash, email, account_type)
VALUES ('artist_user_2', 'hashed_password', 'artist_user_2@example.com', 'artist');

-- Insert Artist 2
INSERT INTO artists (name, phone, email)
VALUES ('Artist Two', '555-5678', 'artisttwo@example.com');

-- Link the User to the Artist
UPDATE users SET artist_id = (SELECT id FROM artists WHERE email = 'artisttwo@example.com')
WHERE username = 'artist_user_2';


-- Insert Venue Users and Related Venue Information
-- Venue User 1
INSERT INTO users (username, password_hash, email, account_type)
VALUES ('venue_user_1', 'hashed_password', 'venue_user_1@example.com', 'venue');

-- Insert Venue 1
INSERT INTO venues (name, capacity, address, city, state, zip_code)
VALUES ('Venue One', 500, '123 Venue St', 'Los Angeles', 'CA', '90001');

-- Link the User to the Venue
UPDATE users SET venue_id = (SELECT id FROM venues WHERE name = 'Venue One')
WHERE username = 'venue_user_1';

-- Venue User 2
INSERT INTO users (username, password_hash, email, account_type)
VALUES ('venue_user_2', 'hashed_password', 'venue_user_2@example.com', 'venue');

-- Insert Venue 2
INSERT INTO venues (name, capacity, address, city, state, zip_code)
VALUES ('Venue Two', 800, '456 Venue Ave', 'New York', 'NY', '10001');

-- Link the User to the Venue
UPDATE users SET venue_id = (SELECT id FROM venues WHERE name = 'Venue Two')
WHERE username = 'venue_user_2';
