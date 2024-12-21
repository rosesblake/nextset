"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
  // authenticate user with username, password
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT
          username,
          password_hash AS "passwordHash",
          email,
          role,
          access_level AS "accessLevel",
          account_type AS "accountType",
          artist_id AS "artistId",
          venue_id AS "venueId",
          created_at AS "createdAt"
        FROM users
        WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (isValid) {
        delete user.passwordHash; // Remove sensitive data
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }
  //register a new user
  static async register({
    username,
    passwordHash,
    email,
    role = "user",
    accessLevel = "ADMIN",
    accountType,
    artistId,
    venueId,
  }) {
    //check if username already exists
    const duplicateCheck = await db.query(
      `SELECT username
        FROM users
        WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }
    //hash password securely
    const hashedPassword = await bcrypt.hash(passwordHash, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
        (username,
        password_hash,
        email,
        role,
        access_level,
        account_type,
        artist_id,
        venue_id
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING username,
          email,
          role,
          access_level AS "accessLevel",
          account_type AS "accountType",
          artist_id AS "artistId",
          venue_id AS "venueId",
          created_at AS "createdAt"`,
      [
        username,
        passwordHash,
        email,
        role,
        accessLevel,
        accountType,
        artistId,
        venueId,
      ]
    );
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
