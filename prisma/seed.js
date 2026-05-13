const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const data1 = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("Admin berhasil dibuat");
  console.log(data1);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
