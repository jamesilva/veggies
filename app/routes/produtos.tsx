import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllProducts } from "~/models/product.server";
import type { Product } from "~/models/product.server";

type LoaderData = {
  products: Awaited<ReturnType<typeof getAllProducts>>;
};

export let loader: LoaderFunction = async ({ request }) => {
  return { products: await getAllProducts() };
};

export default function Products() {
  let { products } = useLoaderData<LoaderData>();

  return products.map((product) => {
    return <ProductComponent key={product.id} product={product} />;
  });
}

function ProductComponent({ product }: { product: Product }) {
  return (
    <article>
      <h4>{product.name}</h4>
      <div>
        <p>{product.quantity}</p>
        <p>{product.price}</p>
      </div>
    </article>
  );
}
