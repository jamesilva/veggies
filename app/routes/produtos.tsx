import type { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useParams } from "@remix-run/react";
import { getAllProducts } from "~/models/product.server";

export type LoaderData = {
  products: Awaited<ReturnType<typeof getAllProducts>>;
};

export let loader: LoaderFunction = async ({ request }) => {
  return { products: await getAllProducts() };
};

export default function Products() {
  let { category, productId } = useParams();

  return (
    <section className="px-[3vw]">
      <header className="py-4 md:col-start-2">
        <ol className="inline-flex gap-x-4">
          <li>
            <Link to=".">Categorias</Link>
          </li>
          {category ? (
            <li>
              {" "}
              <Link className="capitalize" to={`${category}`}>
                {category}
              </Link>
            </li>
          ) : null}
          {/* {productId ? (
            <li>
              {" "}
              <Link className="capitalize" to={`${productId}`}>
                {productId}
              </Link>
            </li>
          ) : null} */}
        </ol>
      </header>
      <Outlet />
    </section>
  );
}
