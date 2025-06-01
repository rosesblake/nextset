require("dotenv").config();
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

  // Create users
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
  const user5 = await prisma.users.create({
    data: {
      password_hash: hashed_password,
      email: "troubadour@gmail.com",
      access_level: "ADMIN",
      account_type: "venue",
      full_name: "Testing Dev",
    },
  });

  console.log("User seeded successfully:");

  // Create artists
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
      hometown_lat: 34.052235,
      hometown_lng: -118.243683,
    },
  });

  const artist2 = await prisma.artists.create({
    data: {
      name: "Wasp Eater",
      hometown_city: "Nashville, TN",
      hometown_state: "CA",
      hometown_lat: 36.16634,
      hometown_lng: -86.779068,
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
      hometown_lat: 34.052235,
      hometown_lng: -118.243683,
      bio: "Artist from LA",
      instagram_handle: "https://instagram.com/dazyface",
      x_handle: "https://x.com/dazyface",
      facebook_url: "https://facebook.com/dazyface",
      apple_music_url: "https://music.apple.com/dazyface",
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

  await prisma.artist_users.createMany({
    data: [
      { user_id: user.id, artist_id: artist.id, role: "Creator" },
      { user_id: user3.id, artist_id: artist2.id, role: "Creator" },
      { user_id: user4.id, artist_id: artist3.id, role: "Creator" },
    ],
  });

  console.log("User-Artist association created successfully.");

  // Create venues
  await prisma.venues.createMany({
    data: [
      {
        name: "Troubadour",
        capacity: 500,
        full_address: "9081 N Santa Monica Blvd, West Hollywood, CA, 90069",
        street: "9081 N Santa Monica Blvd",
        lat: 34.081577,
        lng: -118.389221,
        city: "Los Angeles",
        state: "CA",
        zip_code: "90069",
        created_by: user5.id,
      },
      {
        name: "The Echo",
        capacity: 350,
        full_address: "1822 W Sunset Blvd, Los Angeles, CA 90026",
        street: "1822 W Sunset Blvd",
        lat: 34.077617,
        lng: -118.260059,
        city: "Los Angeles",
        state: "CA",
        zip_code: "90026",
        created_by: user2.id,
      },
    ],
  });

  console.log("Venues seeded successfully.");

  const troubadour = await prisma.venues.findUnique({
    where: { name: "Troubadour" },
  });
  const theEcho = await prisma.venues.findUnique({
    where: { name: "The Echo" },
  });

  // Create amenities
  await prisma.amenities.createMany({
    data: [
      { name: "Green Room" },
      { name: "Backline Provided" },
      { name: "Parking" },
      { name: "Hospitality" },
      { name: "Merch Table" },
    ],
  });

  console.log("Amenities created.");

  const allAmenities = await prisma.amenities.findMany();

  async function assignAmenitiesToVenue(venueId, amenityNames) {
    const data = allAmenities
      .filter((a) => amenityNames.includes(a.name))
      .map((a) => ({ venue_id: venueId, amenity_id: a.id }));
    await prisma.venue_amenities.createMany({ data, skipDuplicates: true });
  }

  if (troubadour?.id && theEcho?.id) {
    await assignAmenitiesToVenue(troubadour.id, [
      "Green Room",
      "Backline Provided",
      "Merch Table",
    ]);
    await assignAmenitiesToVenue(theEcho.id, [
      "Parking",
      "Hospitality",
      "Green Room",
    ]);
    console.log("Amenities assigned to venues.");
  }

  await prisma.venue_users.createMany({
    data: [
      { user_id: user2.id, venue_id: theEcho.id, role: "Creator" },
      { user_id: user5.id, venue_id: troubadour.id, role: "Creator" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
