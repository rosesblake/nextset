const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding venues...");
  await prisma.venue_blocked_dates.deleteMany();

  await prisma.venues.deleteMany();

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
        created_by: 1, // Assuming a valid user ID exists in your database
      },
      {
        name: "Echo Lounge",
        capacity: 500,
        address: "456 Broadway Ave",
        city: "Nashville",
        state: "TN",
        zip_code: 37203,
        created_by: 1, // Assuming the same user ID
      },
      {
        name: "The Sound Vault",
        capacity: 800,
        address: "123 Music Row",
        city: "Austin",
        state: "TX",
        zip_code: 78701,
        created_by: 1, // Assuming the same user ID
      },
      {
        name: "Melody Hall",
        capacity: 1200,
        address: "789 Harmony St",
        city: "Chicago",
        state: "IL",
        zip_code: 60605,
        created_by: 1, // Assuming the same user ID
      },
      {
        name: "The Groove Spot",
        capacity: 600,
        address: "345 Rhythm Blvd",
        city: "Seattle",
        state: "WA",
        zip_code: 98101,
        created_by: 1, // Assuming the same user ID
      },
      {
        name: "Vibe Arena",
        capacity: 1000,
        address: "987 Sunset Drive",
        city: "Los Angeles",
        state: "CA",
        zip_code: 90015,
        created_by: 1, // Assuming the same user ID
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
