// tests/pitches.test.js
const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const { prisma } = require("../prisma/db");

let authCookie;
let testUser;
let testVenue;
let testArtist;

beforeAll(async () => {
  // Clean up all related tables in FK-safe order
  await prisma.venue_blocked_dates.deleteMany();
  await prisma.artist_pitches.deleteMany();
  await prisma.pitches.deleteMany();
  await prisma.artist_users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.venue_users.deleteMany();
  await prisma.venues.deleteMany();
  await prisma.users.deleteMany({ where: { email: "pitchtest@example.com" } });

  const hashedPassword = await bcrypt.hash("password", 12);

  // Create test user
  testUser = await prisma.users.create({
    data: {
      email: "pitchtest@example.com",
      full_name: "Pitch Tester",
      password_hash: hashedPassword,
      account_type: "artist",
      role: "user",
    },
  });

  // Login and grab cookie
  const loginRes = await request(app)
    .post("/auth/login")
    .send({ email: "pitchtest@example.com", password: "password" });

  authCookie = loginRes.headers["set-cookie"];

  // Register a venue
  const venueRes = await request(app)
    .post("/venues/register")
    .set("Cookie", authCookie)
    .send({
      name: "Pitch Test Venue",
      capacity: 500,
      full_address: "123 Venue St, Testville",
      city: "Testville",
      state: "TS",
      street: "123 Venue St",
      zip_code: "12345",
      lat: 34.0522,
      lng: -118.2437,
      created_by: testUser.id,
    });

  if (venueRes.statusCode !== 201) {
    console.error("Venue registration failed:", venueRes.body);
  }

  testVenue = venueRes.body?.venue;

  // Register an artist
  const artistRes = await request(app)
    .post("/artists/register")
    .set("Cookie", authCookie)
    .send({
      name: "Pitch Test Artist",
      spotify_id: "test_spotify_123",
      spotify_url: "https://open.spotify.com/artist/test",
      spotify_photo: "http://example.com/photo.jpg",
      spotify_followers: 12345,
      spotify_popularity: 55,
      hometown_city: "Test City",
      hometown_state: "TS",
      hometown_country: "USA",
      hometown_lat: 34.0522,
      hometown_lng: -118.2437,
      created_by: testUser.id,
    });

  if (artistRes.statusCode !== 201) {
    console.error("Artist registration failed:", artistRes.body);
  }

  testArtist = artistRes.body?.artist;
});

afterAll(async () => {
  await prisma.venue_blocked_dates.deleteMany();
  await prisma.artist_pitches.deleteMany();
  await prisma.pitches.deleteMany();
  await prisma.artist_users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.venue_users.deleteMany();
  await prisma.venues.deleteMany();
  await prisma.users.deleteMany({ where: { email: "pitchtest@example.com" } });
  await prisma.$disconnect();
});

describe("POST /pitches", () => {
  test("should create a new pitch", async () => {
    expect(testVenue).toBeDefined();
    expect(testArtist).toBeDefined();

    const res = await request(app)
      .post("/pitches")
      .set("Cookie", authCookie)
      .send({
        venue_id: testVenue.id,
        date: new Date().toISOString(),
        content: "Let us play!",
        support_acts: ["Opener One", "Opener Two"],
        role: "Headliner",
        artist_id: testArtist.id,
      });

    if (res.statusCode !== 201) {
      console.error(
        "Pitch creation failed:",
        JSON.stringify(res.body, null, 2)
      );
    }

    expect(res.statusCode).toBe(201);
    expect(res.body.pitch).toHaveProperty("id");
    expect(res.body.pitch.content).toBe("Let us play!");
  });
});
