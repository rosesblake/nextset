// tests/auth.test.js
const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const { prisma } = require("../prisma/db");

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("password", 12);

  await prisma.users.create({
    data: {
      email: "testuser@example.com",
      password_hash: hashedPassword,
      full_name: "Test User",
      role: "user",
      account_type: "artist",
    },
  });
});

afterAll(async () => {
  await prisma.users.deleteMany({ where: { email: "testuser@example.com" } });
  await prisma.$disconnect();
});

describe("POST /auth/login", () => {
  test("should return 200 and set cookies for valid login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser@example.com", password: "password" });

    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "testuser@example.com");
  });

  test("should return 401 for invalid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser@example.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
