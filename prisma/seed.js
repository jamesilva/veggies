const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "james@james.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("jamesiscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Alface",
      description: `Alface caseira, tipo "iceberg"`,
      price: 1.5,
      quantity: 20,
      producerId: user.id,
    },
  });
  await prisma.product.create({
    data: {
      name: "Cerejas",
      description: `Cerejas do fundão`,
      price: 6.5,
      quantity: 20,
      producerId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
