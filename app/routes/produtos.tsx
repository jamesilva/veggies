import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, Outlet, useMatches, useParams } from "@remix-run/react";
import { getAllProducts } from "~/models/product.server";
import { useMatchesData } from "~/utils";

import type { Product } from "~/models/product.server";

type productData = { product: Product };

export type LoaderData = {
  products: Awaited<ReturnType<typeof getAllProducts>>;
};

export let loader: LoaderFunction = async () => {
  return { products: await getAllProducts() };
};

export let meta: MetaFunction = () => ({
  title: "Vege.tal - Produtos",
});

export default function Products() {
  let { category } = useParams();
  let productData = useMatchesData(
    "routes/produtos/$category/$productId"
  ) as productData;

  return (
    <section className="px-[3vw]">
      <header className="py-4">
        <ol className="inline-flex gap-x-4" aria-label="category navigation">
          <li>
            <Link to=".">Categorias</Link>
          </li>
          {category ? (
            <li>
              <Link className="capitalize" to={`${category}`}>
                {category}
              </Link>
            </li>
          ) : null}
          {productData ? (
            <li className="capitalize"> {productData.product.name}</li>
          ) : null}
        </ol>
      </header>
      <Outlet />
    </section>
  );
}
