const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  // Clear existing data
  await prisma.venue_blocked_dates.deleteMany();
  await prisma.events.deleteMany();
  await prisma.venue_users.deleteMany();
  await prisma.venues.deleteMany();
  await prisma.artist_users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.users.deleteMany();

  const hashed_password = await bcrypt.hash("DevsOnly1995", 10);
  // Create a user
  const user = await prisma.users.create({
    data: {
      password_hash: hashed_password,
      email: "devArtist@gmail.com",
      access_level: "ADMIN",
      account_type: "artist",
      full_name: "Testing Dev",
    },
  });
  const user2 = await prisma.users.create({
    data: {
      password_hash: hashed_password,
      email: "devVenue@gmail.com",
      access_level: "ADMIN",
      account_type: "venue",
      full_name: "Testing Dev",
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
        created_by: user2.id,
      },
      {
        name: "Echo Lounge",
        capacity: 500,
        address: "456 Broadway Ave",
        city: "Nashville",
        state: "TN",
        zip_code: 37203,
        created_by: user2.id,
      },
    ],
  });

  console.log("Venues seeded successfully.");

  // Fetch the venues to seed events
  const velvetRoom = await prisma.venues.findUnique({
    where: { name: "The Velvet Room" },
  });
  const echoLounge = await prisma.venues.findUnique({
    where: { name: "Echo Lounge" },
  });

  //connect user to venue
  await prisma.venue_users.create({
    data: {
      user_id: user2.id,
      venue_id: velvetRoom.id,
      role: "Creator",
    },
  });

  // Seed events (bookings)
  if (velvetRoom && echoLounge) {
    await prisma.events.createMany({
      data: [
        {
          name: "Rock Night",
          venue_id: velvetRoom.id,
          event_date: new Date("2025-01-15"),
          start_time: new Date("2025-01-15T18:00:00"),
          end_time: new Date("2025-01-15T21:00:00"),
          description: "A night of rock music featuring John's Band.",
          ticket_price: 20.0,
          available_tickets: 150,
          status: "Scheduled",
        },
        {
          name: "Jazz Evening",
          venue_id: echoLounge.id,
          event_date: new Date("2025-01-18"),
          start_time: new Date("2025-01-18T19:00:00"),
          end_time: new Date("2025-01-18T22:00:00"),
          description: "An evening of smooth jazz.",
          ticket_price: 25.0,
          available_tickets: 200,
          status: "Scheduled",
        },
      ],
    });

    console.log("Events (bookings) seeded successfully.");
  }

  // Blocked dates for each venue
  const blockedDatesData = [
    { venueName: "The Velvet Room", dates: ["2025-01-15", "2025-01-20"] },
    { venueName: "Echo Lounge", dates: ["2025-01-18", "2025-01-25"] },
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
