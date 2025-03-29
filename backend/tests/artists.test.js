// tests/artists.test.js
const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const { prisma } = require("../prisma/db");

let authCookie;
let testArtist;

beforeAll(async () => {
  await prisma.artist_users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.users.deleteMany({ where: { email: "artisttest@example.com" } });

  const hashedPassword = await bcrypt.hash("password", 12);
  const user = await prisma.users.create({
    data: {
      email: "artisttest@example.com",
      full_name: "Artist Test",
      password_hash: hashedPassword,
      account_type: "artist",
      role: "user",
    },
  });

  const loginRes = await request(app)
    .post("/auth/login")
    .send({ email: "artisttest@example.com", password: "password" });

  authCookie = loginRes.headers["set-cookie"];

  const artistRes = await request(app)
    .post("/artists/register")
    .set("Cookie", authCookie)
    .send({
      name: "Test Artist",
      hometown_city: "Austin",
      hometown_state: "TX",
      hometown_country: "USA",
      hometown_lat: 30.2672,
      hometown_lng: -97.7431,
      spotify_id: "test-spotify-id",
      spotify_photo: "https://example.com/photo.jpg",
      spotify_url: "https://spotify.com/artist/test",
      spotify_popularity: 90,
      spotify_followers: 9999,
      created_by: user.id,
    });

  if (artistRes.statusCode !== 201) {
    console.error("Artist registration failed:", artistRes.body);
  }

  testArtist = artistRes.body?.artist;
});

afterAll(async () => {
  await prisma.artist_users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.users.deleteMany({ where: { email: "artisttest@example.com" } });
  await prisma.$disconnect();
});

describe("GET /artists", () => {
  test("should return a list of artists", async () => {
    const res = await request(app).get("/artists").set("Cookie", authCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((a) => a.name === "Test Artist")).toBe(true);
  });
});

describe("GET /artists/:id", () => {
  test("should return details of a specific artist", async () => {
    expect(testArtist).toBeDefined();

    const res = await request(app)
      .get(`/artists/${testArtist.id}`)
      .set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Test Artist");
  });
});

describe("PATCH /artists/:id", () => {
  test("should update artist details", async () => {
    expect(testArtist).toBeDefined();

    const res = await request(app)
      .patch(`/artists/${testArtist.id}`)
      .set("Cookie", authCookie)
      .send({ genre: "Alternative" });

    expect(res.statusCode).toBe(200);
    expect(res.body.genre).toBe("Alternative");
  });
});
