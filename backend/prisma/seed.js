const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding venues...");

  await prisma.venues.createMany({
    data: [
      {
        name: "The Velvet Room",
        capacity: 300,
        address: "123 Main St",
        city: "Austin",
        state: "TX",
        zip_code: 78701,
        available_dates: JSON.stringify(["2025-01-15", "2025-01-20"]),
        created_by: 1, // Assuming a valid user ID exists in your database
      },
      {
        name: "Echo Lounge",
        capacity: 500,
        address: "456 Broadway Ave",
        city: "Nashville",
        state: "TN",
        zip_code: 37203,
        available_dates: JSON.stringify(["2025-01-18", "2025-01-25"]),
        created_by: 1, // Assuming the same user ID
      },
    ],
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
