import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const collections = ['Design', 'Personal', 'School', 'Groceries'];
  for (let index = 0; index < collections.length; index++) {
    const element = collections[index];
    await prisma.collection.create({
      data: {
        icon: element,
        name: element,
      },
    });
  }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
