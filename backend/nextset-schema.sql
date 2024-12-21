-- Artists table
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    instagram_handle VARCHAR(50),
    x_handle VARCHAR(50),
    facebook_url VARCHAR(255),
    rating_social_media FLOAT,
    spotify_monthly_listeners INT DEFAULT 0,
    spotify_popular_cities JSONB,
    spotify_most_plays VARCHAR(50),
    rating_streams FLOAT,
    w9 VARCHAR(255),
    rider VARCHAR(255),
    manager VARCHAR(50),
    record_label VARCHAR(50),
    tour_booking_agent VARCHAR(50),
    tour_manager VARCHAR(50),
    phone VARCHAR(15) NOT NULL,
    home_city VARCHAR(50),
    home_state VARCHAR(2),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tokens table (relating to artists)
CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    artist_id INT NOT NULL,
    amount INT DEFAULT 0,
    date_purchased DATE,
    date_spent DATE,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Event Artists table (Many-to-Many between artists and events)
CREATE TABLE event_artists (
    event_id INT NOT NULL,
    artist_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, artist_id)
);

-- Members table (Members in the artist group)
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    artist_id INT NOT NULL,
    user_id INT UNIQUE,
    name VARCHAR(30) NOT NULL,
    role VARCHAR(25),
    email VARCHAR(50),
    phone VARCHAR(15),
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Pitch Artists table (Many-to-Many between artists and pitches)
CREATE TABLE pitch_artists (
    pitch_id INT NOT NULL,
    artist_id INT NOT NULL,
    FOREIGN KEY (pitch_id) REFERENCES pitches(id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
    PRIMARY KEY (pitch_id, artist_id)
);

-- Venue Amenity table (Many-to-Many between venues and amenities)
CREATE TABLE venue_amenities (
    venue_id INT NOT NULL,
    amenity_id INT NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (venue_id, amenity_id)
);

-- Venue table
CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    capacity INT DEFAULT 0,
    address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    available_dates JSONB
);

-- Events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    venue_id INT NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME(6),
    end_time TIME(6),
    description TEXT,
    ticket_price DECIMAL(10, 2),
    available_tickets INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Scheduled',
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Pitches table
CREATE TABLE pitches (
    id SERIAL PRIMARY KEY,
    venue_id INT NOT NULL,
    avg_ticket_sales INT DEFAULT 0,
    content TEXT NOT NULL,
    status VARCHAR(15) NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Schedule table (for events in venues)
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    venue_id INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Users table (relating to members and artists)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    access_level VARCHAR(20) DEFAULT 'ADMIN',
    account_type VARCHAR(20),
    artist_id INT,
    venue_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artists(id),
    FOREIGN KEY (venue_id) REFERENCES venues(id)
);
