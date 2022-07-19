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
  let product = await getProduct(productId);
  if (!product) throw new Error("item not found");
  return { product };
};

export default function ProductPage() {
  let { product } = useLoaderData<LoaderData>();
  return (
    <article className="grid grid-rows-[1fr,2fr]">
      <div>
        <h4>{product.name}</h4>
        🥬
        <p>Quantity: {product.quantity}</p>
        <p>Price: {product.price}</p>
      </div>
      <div>
        <p>{product.description}</p>
      </div>
    </article>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-y-8 rounded border-2 border-red-300 bg-red-50">
      <div className="text-center">
        <h3 className="text-2xl uppercase">Uh-oh</h3>
        <p className="text-2xl">🍅</p>
      </div>
      <p className="">
        We can't seem to find this veggie. Maybe it's still underground?
      </p>
    </div>
  );
}
