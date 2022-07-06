import type { User, Product } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Product } from "@prisma/client";

export function getProduct({
  id,
  producerId,
}: Pick<Product, "id"> & {
  producerId: User["id"];
}) {
  return prisma.product.findFirst({
    where: { id, producerId },
  });
}

export function getAllProducts() {
  return prisma.product.findMany();
}

export function getProductListItems({
  producerId,
}: {
  producerId: User["id"];
}) {
  return prisma.product.findMany({
    where: { producerId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createProduct({
  description,
  name,
  price,
  quantity,
  userId,
}: Pick<Product, "description" | "name" | "price" | "quantity"> & {
  userId: User["id"];
}) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
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
