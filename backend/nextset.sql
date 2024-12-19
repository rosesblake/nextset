-- Step 1: Drop existing database if it exists
DROP DATABASE IF EXISTS nextset;

-- Step 2: Create a new database
CREATE DATABASE nextset;

-- Step 3: Connect to the newly created database
\c nextset

-- Step 4: Run the schema file to create tables
\i nextset-schema.sql

-- Step 5: Run the seed file to insert data
\i nextset-seed.sql
