DROP DATABASE nextset;
CREATE DATABASE nextset;
\connect nextset

\i nextset-schema.sql
\i nextset-seed.sql