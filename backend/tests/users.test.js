// tests/users.test.js
const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const { prisma } = require("../prisma/db");

let authCookie;

beforeAll(async () => {
  // Clean up and create test user
  await prisma.users.deleteMany({ where: { email: "usertest@example.com" } });

  const hashedPassword = await bcrypt.hash("password", 12);
  await prisma.users.create({
    data: {
      email: "usertest@example.com",
      full_name: "User Test",
      password_hash: hashedPassword,
      account_type: "artist",
      role: "user",
    },
  });

  // Log in to get auth cookie
  const res = await request(app)
    .post("/auth/login")
    .send({ email: "usertest@example.com", password: "password" });

  authCookie = res.headers["set-cookie"];
});

afterAll(async () => {
  await prisma.users.deleteMany({
    where: {
      email: {
        in: ["usertest@example.com", "updateduser@example.com"],
      },
    },
  });
  await prisma.$disconnect();
});

describe("PATCH /users/update", () => {
  test("should update the user email", async () => {
    const res = await request(app)
      .patch("/users/update")
      .set("Cookie", authCookie)
      .send({
        currUserEmail: "usertest@example.com",
        data: {
          email: "updateduser@example.com",
          currentPassword: "password",
        },
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("updatedUser");
    expect(res.body.updatedUser.email).toBe("updateduser@example.com");
  });
});
