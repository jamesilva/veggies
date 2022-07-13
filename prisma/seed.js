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

  await Promise.all(
    getProducts().map((product) => {
      let data = { producerId: user.id, ...product };
      return prisma.product.create({ data });
    })
  );

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

function getProducts() {
  return [
    {
      name: "Alface",
      description: `Alface caseira, tipo "iceberg"`,
      price: 1.5,
      quantity: 20,
      category: "Legumes",
    },
    {
      name: "Cerejas",
      description: `Cerejas do fundão`,
      price: 6.5,
      quantity: 20,
      category: "Fruta",
    },
    {
      name: "Feijão",
      description: `Feijão do fundão`,
      price: 3.5,
      quantity: 20,
      category: "Leguminosas",
    },
    {
      name: "Batatas",
      description: `Batatas do fundão`,
      price: 1.5,
      quantity: 30,
      category: "Legumes",
    },
    {
      name: "Castanhas",
      description: `Castanhas do fundão`,
      price: 6.5,
      quantity: 20,
      category: "Frutos Secos",
    },
  ];
}
