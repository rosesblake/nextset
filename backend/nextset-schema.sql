CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    instagram_handle VARCHAR(50),
    x_handle VARCHAR(50),
    facebook_url TEXT,
    rating_social_media FLOAT,
    spotify_monthly_listeners INTEGER CHECK (spotify_monthly_listeners >= 0),
    spotify_popular_cities JSON,
    spotify_most_plays VARCHAR(50),
    rating_streams FLOAT,
    tokens INTEGER CHECK (tokens >= 0),
    w9 TEXT, -- File can be represented as a file path or binary data
    rider TEXT, -- Same as above
    manager VARCHAR(50),
    record_label VARCHAR(50),
    tour_booking_agent VARCHAR(50),
    tour_manager VARCHAR(50),
    phone VARCHAR(15) NOT NULL,
    home_city VARCHAR(50),
    home_state VARCHAR(2),
    email TEXT NOT NULL
);

CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    capacity INTEGER CHECK (capacity >= 0),
    address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    available_dates JSON -- For storing multiple dates
    email TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    access_level VARCHAR(20) NOT NULL DEFAULT 'ADMIN',
    account_type VARCHAR(20) CHECK (account_type IN ('artist', 'venue')) NOT NULL, -- 'artist' or 'venue'
    artist_id INTEGER, -- Nullable, will be populated if account_type is 'artist'
    venue_id INTEGER, -- Nullable, will be populated if account_type is 'venue'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    venue_id INTEGER NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    description TEXT,
    ticket_price DECIMAL(10, 2),
    available_tickets INTEGER CHECK (available_tickets >= 0),
    status VARCHAR(20) DEFAULT 'Scheduled'
);


CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    date DATE NOT NULL
);


CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) UNIQUE,
    name VARCHAR(30) NOT NULL,
    role VARCHAR(25),
    email VARCHAR(50),
    phone VARCHAR(15)
);

CREATE TABLE pitches (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    avg_ticket_sales INTEGER,
    content TEXT NOT NULL,
    status VARCHAR(15) NOT NULL
);

CREATE TABLE pitch_artists (
    pitch_id INTEGER NOT NULL REFERENCES pitches(id) ON DELETE CASCADE,
    artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    PRIMARY KEY (pitch_id, artist_id)
);

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    amount INTEGER CHECK (amount >= 0),
    date_purchased DATE,
    date_spent DATE
);

CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE venue_amenities (
    venue_id INTEGER NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    amenity_id INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (venue_id, amenity_id)
);

CREATE TABLE event_artists (
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, artist_id)
);
