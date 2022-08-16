import type { User, Product } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Product } from "@prisma/client";

export function getProduct(id: string) {
  return prisma.product.findFirst({
    where: { id },
  });
}

export function getAllProducts() {
  return prisma.product.findMany({
    select: { id: true, name: true, category: true, price: true },
  });
}

export function getProducerItems(producerId: User["id"]) {
  return prisma.product.findMany({
    where: { producerId },
    select: { id: true, name: true, category: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createProduct({
  description,
  name,
  price,
  quantity,
  category,
  userId,
}: Pick<Product, "description" | "name" | "price" | "quantity" | "category"> & {
  userId: User["id"];
}) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      category,
      producer: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteProduct({
  id,
  producerId,
}: Pick<Product, "id"> & { producerId: User["id"] }) {
  return prisma.product.deleteMany({
    where: { id, producerId },
  });
}
