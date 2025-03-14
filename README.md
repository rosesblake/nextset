# nextset

Deployed at nextset-demo.render.com

## Description

Tour Support is a web and mobile application designed to simplify the booking process for smaller artists and music venues. The app allows artists to pitch their profiles directly to venues and receive responses (yes/no). Artists can view venue availability through integrated calendars, while venues can access detailed artist profiles, including Spotify monthly listeners, social media statistics, genre, and hometown. The goal is to create an efficient, user-friendly platform that bridges the gap between artists and venues, streamlining the booking process for live performances.

## Setup

Dependencies:
npm i in root
npm i in /frontend
npm i in /backend

Deploy:
npm start in root to deploy backend and frontend together

How to use:
Create an artist account to pitch to venues or a venue account to pitch to artists. Create a venue account that will use google maps to add to the google maps display for artists.

## Stack

Frontend: React, TailwindCSS
Backend: Node.js, Express.js, Prisma ORM
Database: PostgreSQL
APIs: Google Maps API, Spotify API, Custom API

## Data

Google Maps API: Venue search and location-based recommendations.
Spotify API: Artist profile data (e.g., monthly listeners, top songs).
Custom API: Handles user authentication, profile data, and bookings.

## Future Goals

Machine Learning: Personalized venue or artist recommendations based on preferences.
Tour Scheduling: Tools for artists to plan multi-city tours with venue availability.
Collaboration Features: Enabling multiple artists to pitch together for joint events.
Rating System: Allow venues and artists to rate each other post-event.
Mobile Optimization: Restyle for mobile.

## db diagram

https://dbdiagram.io/d/66d2563aeef7e08f0e472579

## Developer

Blake Roses
Rosesblake@yahoo.com
