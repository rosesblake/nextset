const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.venue_blocked_dates.deleteMany();
  await prisma.venues.deleteMany();
  await prisma.artist_users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.users.deleteMany();

  // Create a user
  const user = await prisma.users.create({
    data: {
      password_hash: "hashed_password",
      email: "john.doe@example.com",
      access_level: "ADMIN",
      account_type: "Artist",
      full_name: "John Doe",
    },
  });

  console.log("User seeded successfully:");

  // Create an artist associated with the user
  const artist = await prisma.artists.create({
    data: {
      name: "John's Band",
      instagram_handle: "johnbandinsta",
      x_handle: "@johnband",
      facebook_url: "https://facebook.com/johnband",
      rating_social_media: 4.5,
      spotify_popular_cities: { city1: "Austin", city2: "Los Angeles" }, // Example JSON
      rating_streams: 4.8,
      w9: "path/to/w9.pdf",
      rider: "path/to/rider.pdf",
      manager: "Jane Manager",
      record_label: "Indie Records",
      tour_booking_agent: "Booking Agent Inc.",
      tour_manager: "Tour Manager",
      phone: "123-456-7890",
      email: "contact@johnband.com",
      created_by: user.id,
      genre: "Rock",
      spotify_url: "https://open.spotify.com/johnband",
      hometown: "Austin",
      spotify_followers: 12000,
      spotify_photo: "path/to/photo.jpg",
      spotify_popularity: 80,
      stage_plot: "path/to/stage_plot.pdf",
      spotify_id: "123456789",
    },
  });

  console.log("Artist seeded successfully:");

  // Associate the user with the artist using the `artist_users` table
  await prisma.artist_users.create({
    data: {
      user_id: user.id,
      artist_id: artist.id,
      role: "Creator",
    },
  });

  console.log("User-Artist association created successfully.");

  // Create venues
  const venues = await prisma.venues.createMany({
    data: [
      {
        name: "The Velvet Room",
        capacity: 300,
        address: "123 Main St",
        city: "Austin",
        state: "TX",
        zip_code: 78701,
        created_by: user.id,
      },
      {
        name: "Echo Lounge",
        capacity: 500,
        address: "456 Broadway Ave",
        city: "Nashville",
        state: "TN",
        zip_code: 37203,
        created_by: user.id,
      },
      {
        name: "The Sound Vault",
        capacity: 800,
        address: "123 Music Row",
        city: "Austin",
        state: "TX",
        zip_code: 78701,
        created_by: user.id,
      },
      {
        name: "Melody Hall",
        capacity: 1200,
        address: "789 Harmony St",
        city: "Chicago",
        state: "IL",
        zip_code: 60605,
        created_by: user.id,
      },
      {
        name: "The Groove Spot",
        capacity: 600,
        address: "345 Rhythm Blvd",
        city: "Seattle",
        state: "WA",
        zip_code: 98101,
        created_by: user.id,
      },
      {
        name: "Vibe Arena",
        capacity: 1000,
        address: "987 Sunset Drive",
        city: "Los Angeles",
        state: "CA",
        zip_code: 90015,
        created_by: user.id,
      },
    ],
  });

  console.log("Venues seeded successfully.");

  // Blocked dates for each venue
  const blockedDatesData = [
    { venueName: "The Velvet Room", dates: ["2025-01-15", "2025-01-20"] },
    { venueName: "Echo Lounge", dates: ["2025-01-18", "2025-01-25"] },
    { venueName: "The Sound Vault", dates: ["2025-02-10", "2025-02-17"] },
    { venueName: "Melody Hall", dates: ["2025-03-05", "2025-03-12"] },
    { venueName: "The Groove Spot", dates: ["2025-01-20", "2025-01-27"] },
    { venueName: "Vibe Arena", dates: ["2025-04-10", "2025-04-17"] },
  ];

  for (const { venueName, dates } of blockedDatesData) {
    const venue = await prisma.venues.findUnique({
      where: { name: venueName },
    });

    if (venue) {
      for (const date of dates) {
        await prisma.venue_blocked_dates.create({
          data: {
            venue_id: venue.id,
            blocked_date: new Date(date),
          },
        });
      }
    }
  }

  console.log("Blocked dates seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
