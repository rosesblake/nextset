CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) UNIQUE NOT NULL,
    instagram TEXT NOT NULL,
    spotify_link TEXT NOT NULL,
    tokens INTEGER CHECK (tokens >=0),
    w9 FILE,
    rider FILE,
    manager VARCHAR(25),
    record_label VARCHAR(25),
    booking_agent VARCHAR(25),
    tour_manager VARCHAR(25),
    phone VARCHAR(12) NOT NULL,
    hometown TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    capacity INTEGER CHECK (capacity >= 0)
    address VARCHAR(25),
    city VARCHAR(20),
    state VARCHAR(2),
    zip_code VARCHAR(7),
);

CREATE TABLE calendars (
    venue_id INTEGER PRIMARY KEY
        REFERENCES venues ON DELETE CASCADE,
    date TEXT NOT NULL
);

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT,
    access_level TEXT NOT NULL DEFAULT ADMIN,
    artist_id INTEGER
        REFERENCES artists ON DELETE CASCADE,
    venue_id INTEGER
        REFERENCES venues ON DELETE CASCADE
);

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER NOT NULL
        REFERENCES artists ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    instrument TEXT,
    email TEXT,
    phone INTEGER
);

CREATE TABLE pitches (
    id SERIAL PRIMARY KEY,
    venue_id INTEGER NOT NULL
        REFERENCES venues ON DELETE CASCADE,
    content TEXT NOT NULL,
    status TEXT NOT NULL
);

CREATE TABLE artists_pitches (
    pitch_id INTEGER NOT NULL
        REFERENCES pitches ON DELETE CASCADE,
    artist_id INTEGER NOT NULL
        REFERENCES artists ON DELETE CASCADE
)