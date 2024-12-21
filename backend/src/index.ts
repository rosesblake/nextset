import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // https://www.youtube.com/watch?v=RebA5J-rlwg&ab_channel=WebDevSimplified
  //just for example
  // await prisma.users.deleteMany();
  // const user = await prisma.users.create({
  //   data: {
  //     username: "PrismaTest2",
  //     password_hash: "passwordHash",
  //     email: "yolo2@gmail.com",
  //     account_type: "artist",
  //   },
  // });
  // console.log(user);
  // const allUsers = await prisma.users.findMany();
  // console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
