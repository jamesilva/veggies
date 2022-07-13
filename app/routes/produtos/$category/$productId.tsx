import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProduct } from "~/models/product.server";

type LoaderData = {
  product: Awaited<ReturnType<typeof getProduct>>;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  let productId = params.productId;
  if (!productId || typeof productId !== "string")
    throw new Error("item not found");
  return { product: await getProduct(productId) };
};

export default function ProductPage() {
  let { product } = useLoaderData<LoaderData>();
  return (
    <div>
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <p>{product?.quantity}</p>
    </div>
  );
}
