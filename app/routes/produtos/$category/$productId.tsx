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
    <article className="flex w-1/2 flex-col gap-y-4">
      <div>
        <h4>{product.name}</h4>
        🥬
      </div>
      <div>
        <p>Quantidade: {product.quantity}</p>
        <p>Preço: {product.price} €</p>
        <p>{product.description}</p>
      </div>
      <button
        className="rounded border bg-teal-800 py-1 px-3 text-white hover:bg-teal-700"
        type="button"
      >
        Encomendar
      </button>
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
