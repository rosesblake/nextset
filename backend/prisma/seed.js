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

  const hashed_password = await bcrypt.hash("Devtester123", 10);
  // Create a user
  const user = await prisma.users.create({
    data: {
      password_hash: hashed_password,
      email: "sleepinglion@gmail.com",
      access_level: "ADMIN",
      account_type: "artist",
      full_name: "Nate",
    },
  });
  const user3 = await prisma.users.create({
    data: {
      password_hash: hashed_password,
      email: "waspeater@gmail.com",
      access_level: "ADMIN",
      account_type: "artist",
      full_name: "Makena",
    },
  });
  const user4 = await prisma.users.create({
    data: {
      password_hash: hashed_password,
      email: "dazyface@gmail.com",
      access_level: "ADMIN",
      account_type: "artist",
      full_name: "Blake",
    },
  });
  const user2 = await prisma.users.create({
    data: {
      password_hash: hashed_password,
      email: "theecho@gmail.com",
      access_level: "ADMIN",
      account_type: "venue",
      full_name: "Testing Dev",
    },
  });

  console.log("User seeded successfully:");

  // Create an artist associated with the user
  const artist = await prisma.artists.create({
    data: {
      name: "Sleeping Lion",
      bio: "Artist from LA",
      hometown_city: "Los Angeles",
      hometown_state: "CA",
      instagram_handle: "https://instagram.com/sleepinglion",
      x_handle: "https://x.com/sleepinglion",
      facebook_url: "https://facebook.com/sleepinglion",
      soundcloud: "https://soundcloud.com/sleepinglion",
      tiktok: "https://tiktok.com/sleepinglion",
      live_show_url: "https://youtube.com/sleepinglion",
      manager: "Jane Doe",
      apple_music_url: "https://music.apple.com/sleepinglion",
      record_label: "Indie Records",
      tour_booking_agent: "Booking Agent Inc.",
      phone: "123-456-7890",
      email: "contact@sleepinglion.com",
      created_by: user.id,
      genre: "Indie",
      spotify_url: "https://open.spotify.com/artist/4sBiA3ARQSDSGUqI2mbWgf",
      spotify_followers: 20134,
      spotify_photo:
        "https://i.scdn.co/image/ab6761610000e5ebb742759dee71e7a831a2f3d7",
      spotify_popularity: 28,
      spotify_id: "4sBiA3ARQSDSGUqI2mbWgf",
      website: "sleepinglion.com",
    },
  });
  const artist2 = await prisma.artists.create({
    data: {
      name: "Wasp Eater",
      hometown_city: "Nashville, TN",
      hometown_state: "CA",
      bio: "Artist living in Nashville, TN",
      instagram_handle: "https://instagram.com/waspeater",
      x_handle: "https://x.com/waspeater",
      facebook_url: "https://facebook.com/waspeater",
      apple_music_url: "https://music.apple.com/waspeater",
      soundcloud: "https://soundcloud.com/waspeater",
      tiktok: "https://tiktok.com/waspeater",
      live_show_url: "https://youtube.com/waspeater",
      manager: "Jane Doe",
      record_label: "Indie Records",
      tour_booking_agent: "Booking Agent Inc.",
      phone: "123-456-7890",
      email: "contact@waspeater.com",
      created_by: user3.id,
      genre: "Indie",
      spotify_url: "https://open.spotify.com/artist/0uvc4QVl9UxVWzc9jZDyRs",
      spotify_followers: 20134,
      spotify_photo:
        "https://i.scdn.co/image/ab6761610000e5eb2193bc8a7734dd438645eccb",
      spotify_popularity: 4,
      spotify_id: "0uvc4QVl9UxVWzc9jZDyRs",
      website: "waspeater.com",
    },
  });
  const artist3 = await prisma.artists.create({
    data: {
      name: "DAZYFACE",
      hometown_city: "Los Angeles",
      hometown_state: "CA",
      bio: "Artist from LA",
      instagram_handle: "https://instagram.com/dazyface",
      x_handle: "https://x.com/dazyface",
      facebook_url: "https://facebook.com/dazyface",
      apple_music_url: "https://music.apple.com/dazyface",
      facebook_url: "https://facebook.com/dazyface",
      soundcloud: "https://soundcloud.com/dazyface",
      tiktok: "https://tiktok.com/dazyface",
      live_show_url: "https://youtube.com/dazyface",
      manager: "Jane Doe",
      record_label: "Indie Records",
      tour_booking_agent: "Booking Agent Inc.",
      phone: "123-456-7890",
      email: "contact@dazyface.com",
      created_by: user.id,
      genre: "Pop",
      spotify_url: "https://open.spotify.com/artist/4vJ1RNF9RskhqDAnHFnJdZ",
      spotify_followers: 20134,
      spotify_photo:
        "https://i.scdn.co/image/ab6761610000e5eb0502e3e577236f8b450e1261",
      spotify_popularity: 2,
      spotify_id: "4vJ1RNF9RskhqDAnHFnJdZ",
      website: "dazyface.com",
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
  await prisma.artist_users.create({
    data: {
      user_id: user3.id,
      artist_id: artist2.id,
      role: "Creator",
    },
  });
  await prisma.artist_users.create({
    data: {
      user_id: user4.id,
      artist_id: artist3.id,
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
      {
        name: "The Echo",
        capacity: 250,
        address: "456 Broadway Ave",
        city: "Los Angeles",
        state: "CA",
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
  const theEcho = await prisma.venues.findUnique({
    where: { name: "The Echo" },
  });

  //connect user to venue
  await prisma.venue_users.create({
    data: {
      user_id: user2.id,
      venue_id: theEcho.id,
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
