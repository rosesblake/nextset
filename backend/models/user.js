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
      `SELECT username,
                password,
                first_name
        `
    );
  }
}
