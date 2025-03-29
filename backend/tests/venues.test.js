const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const { prisma } = require("../prisma/db");

let authCookie;
let testVenue = null;

beforeAll(async () => {
  // Clean slate
  await prisma.venue_users.deleteMany();
  await prisma.venue_amenities.deleteMany();
  await prisma.venue_blocked_dates.deleteMany();
  await prisma.venues.deleteMany();
  await prisma.users.deleteMany({ where: { email: "venueuser@example.com" } });

  // Create user
  const password_hash = await bcrypt.hash("password", 12);
  const user = await prisma.users.create({
    data: {
      full_name: "Venue User",
      email: "venueuser@example.com",
      password_hash,
      account_type: "venue",
      role: "user",
    },
  });

  // Login
  const res = await request(app).post("/auth/login").send({
    email: "venueuser@example.com",
    password: "password",
  });

  authCookie = res.headers["set-cookie"];

  // Register venue
  const venueRes = await request(app)
    .post("/venues/register")
    .set("Cookie", authCookie)
    .send({
      name: "Test Venue",
      capacity: 100,
      full_address: "123 Main St",
      city: "Testville",
      state: "TS",
      street: "123 Main St",
      zip_code: "12345",
      lat: 1,
      lng: 1,
      created_by: user.id,
    });

  if (venueRes.statusCode === 201) {
    testVenue = venueRes.body.venue;
  }
});

afterAll(async () => {
  await prisma.venue_users.deleteMany();
  await prisma.venue_amenities.deleteMany();
  await prisma.venue_blocked_dates.deleteMany();
  await prisma.venues.deleteMany();
  await prisma.users.deleteMany({ where: { email: "venueuser@example.com" } });
  await prisma.$disconnect();
});

describe("POST /venues/register", () => {
  test("should register a new venue", () => {
    expect(testVenue).toBeDefined();
    expect(testVenue.name).toBe("Test Venue");
  });
});

describe("GET /venues", () => {
  test("should return venues list", async () => {
    const res = await request(app).get("/venues").set("Cookie", authCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.venues)).toBe(true);
  });
});

describe("PATCH /venues/:id", () => {
  test("should update venue info", async () => {
    if (!testVenue) return;

    const res = await request(app)
      .patch(`/venues/${testVenue.id}`)
      .set("Cookie", authCookie)
      .send({ name: "Updated Venue Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Venue Name");
  });
});
